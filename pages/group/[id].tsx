import { Center, Grid, LoadingOverlay, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import AddExpenseForm from "../../components/AddExpenseForm";
import NoContent from "../../components/common/NoContent";
import ExpenseList from "../../components/ExpenseList";
import ExpenseSummary from "../../components/ExpenseSummary";
import { useAuth } from "../../context/auth/authContext";
import toast from "../../libs/toast";
import { AddExpense } from "../../models/expense/schema/expense.add.schema";
import ExpenseClientService from "../../services/expense.client.service";
import GroupsClientService from "../../services/groups.client.service";
import { IGroup } from "../../types/Group.type";
import getStringValueFromQuery from "../../utils/getValueFromQuery";

const groupService = GroupsClientService.getInstance();

const addFn = async ({ data, groupId, expense }: { data: IGroup; groupId: string; expense: AddExpense }) => {
  const res = await expenseService.add({ groupId, expense });

  if (!res.payload) {
    throw "Error add expense";
  }

  const { expenseId, createdAt } = res.payload;
  const newExpenseList: IGroup["expenseList"] = data.expenseList
    ? [...data.expenseList, { id: expenseId, createdAt, ...expense }]
    : [{ id: expenseId, createdAt, ...expense }];
  return {
    ...data,
    expenseList: newExpenseList,
  };
};

const deleteFn = async ({ data, groupId, expenseId }: { data: IGroup; groupId: string; expenseId: string }) => {
  const res = await expenseService.delete({ groupId, expenseId });

  if (!res.payload) {
    throw "Error delete expense";
  }

  const newExpenseList: IGroup["expenseList"] = data.expenseList.filter((expense) => expense.id !== expenseId);
  return {
    ...data,
    expenseList: newExpenseList,
  };
};

const fetcher = async ([_, groupId]: string[]) => {
  const resp = await groupService.getGroup({ groupId });

  if (resp.error) {
    throw resp.error;
  }

  return resp.payload;
};

const expenseService = ExpenseClientService.getInstance();

export default function ExpenseMain() {
  const { query } = useRouter();
  const { authUser } = useAuth();
  const id = getStringValueFromQuery({ query, field: "id" });
  const { data, isLoading, error, mutate } = useSWR(id ? ["api/groups", id] : null, fetcher, {
    revalidateOnFocus: false,
  });

  const addExpense = async ({ groupId, expense }: { groupId: string; expense: AddExpense }) => {
    if (!data) return;

    try {
      await mutate(addFn({ data, groupId, expense }), {
        revalidate: false,
        rollbackOnError: true,
      });
      toast.success("정산정보 등록");
    } catch (error) {
      toast.error("정산정보 등록실패");
    }
  };

  const deleteExpense = async ({ groupId, expenseId }: { groupId: string; expenseId: string }) => {
    if (!data) return;
    try {
      await mutate(deleteFn({ data, groupId, expenseId }), {
        revalidate: false,
        rollbackOnError: true,
      });

      toast.success("정산정보 삭제성공");
    } catch (error) {
      toast.error("정산정보 삭제실패");
    }
  };

  if (id == null || data === undefined || isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  if (error || data === null) {
    return (
      <Grid.Col span={12}>
        <Center>
          <NoContent title="500 Error">에러가 발생했습니다. 관리자에게 문의해주세요</NoContent>
        </Center>
      </Grid.Col>
    );
  }

  return (
    <>
      <Grid.Col span={12} md={5} order={2} orderMd={1}>
        <Stack>
          {authUser && <AddExpenseForm group={data} onSubmit={(expense) => addExpense({ groupId: id, expense })} />}
          <ExpenseSummary group={data} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} md={7} order={1} orderMd={2}>
        <ExpenseList
          expenseList={data?.expenseList ?? []}
          onDelete={authUser ? (expenseId) => deleteExpense({ groupId: id, expenseId }) : undefined}
        />
      </Grid.Col>
    </>
  );
}
