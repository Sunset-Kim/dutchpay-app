import NoContent from "@/components/common/NoContent";
import AddExpenseForm from "@/components/expense/AddExpenseForm";
import ExpenseList from "@/components/expense/ExpenseList";
import ExpenseSummary from "@/components/expense/ExpenseSummary";
import { useAuth } from "@/context/auth/authContext";
import toast from "@/libs/toast";
import { AddExpense } from "@/models/expense/schema/expense.add.schema";
import ExpenseClientService from "@/services/expense.client.service";
import GroupsClientService from "@/services/groups.client.service";
import { IGroup } from "@/types/Group.type";
import getStringValueFromQuery from "@/utils/getValueFromQuery";
import { Center, Grid, LoadingOverlay, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";

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

  const newExpenseList: IGroup["expenseList"] = data.expenseList?.filter((expense) => expense.id !== expenseId);
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

  const isOwner = authUser?.uid === data?.ownerId;

  const addExpense = async ({ groupId, expense }: { groupId: string; expense: AddExpense }) => {
    if (!data) return;

    try {
      await mutate(addFn({ data, groupId, expense }), {
        revalidate: false,
        rollbackOnError: true,
      });
      toast.success("???????????? ??????");
    } catch (error) {
      toast.error("???????????? ????????????");
    }
  };

  const deleteExpense = async ({ groupId, expenseId }: { groupId: string; expenseId: string }) => {
    if (!data) return;
    try {
      await mutate(deleteFn({ data, groupId, expenseId }), {
        revalidate: false,
        rollbackOnError: true,
      });

      toast.success("???????????? ????????????");
    } catch (error) {
      toast.error("???????????? ????????????");
    }
  };

  if (id == null || data === undefined || isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  if (error || data === null) {
    return (
      <Grid.Col span={12}>
        <Center>
          <NoContent title="500 Error">????????? ??????????????????. ??????????????? ??????????????????</NoContent>
        </Center>
      </Grid.Col>
    );
  }

  return (
    <>
      <Grid.Col span={12} md={5} order={2} orderMd={1}>
        <Stack>
          {isOwner && <AddExpenseForm group={data} onSubmit={(expense) => addExpense({ groupId: id, expense })} />}
          <ExpenseSummary group={data} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} md={7} order={1} orderMd={2}>
        <ExpenseList
          expenseList={data?.expenseList ?? []}
          onDelete={isOwner ? (expenseId) => deleteExpense({ groupId: id, expenseId }) : undefined}
        />
      </Grid.Col>
    </>
  );
}
