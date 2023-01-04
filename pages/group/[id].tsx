import { Center, Grid, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import AddExpenseForm from "../../components/AddExpenseForm";
import NoContent from "../../components/common/NoContent";
import ExpenseList from "../../components/ExpenseList";
import ExpenseSummary from "../../components/ExpenseSummary";
import { useAuth } from "../../context/auth/authContext";
import GroupsClientService from "../../services/groups.client.service";
import getStringValueFromQuery from "../../utils/getValueFromQuery";

const groupService = GroupsClientService.getInstance();

const fetcher = async ([_, groupId]: string[]) => {
  const resp = await groupService.getGroup({ groupId });
  if (resp.error) {
    throw resp.error;
  }

  return resp.payload;
};

export default function ExpenseMain() {
  const { query } = useRouter();
  const { authUser } = useAuth();
  const id = getStringValueFromQuery({ query, field: "id" });
  const { data, isLoading, error } = useSWR(id && authUser ? ["api/groups", id] : null, fetcher, {
    revalidateOnFocus: false,
  });

  if (!id) {
    return <div>데이터를 읽고 있습니다!</div>;
  }

  if (error) {
    return (
      <Grid.Col span={12}>
        <Center>
          <NoContent title="500 Error">에러가 발생했습니다. 관리자에게 문의해주세요</NoContent>
        </Center>
      </Grid.Col>
    );
  }

  if (isLoading || !data) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <Grid.Col span={12} md={5} order={2} orderMd={1}>
        <Stack>
          <AddExpenseForm group={data} onSubmit={(expense) => console.log(data, expense)} />
          <ExpenseSummary group={data} expenseList={data?.expenseList ?? []} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} md={7} order={1} orderMd={2}>
        <ExpenseList expenseList={data?.expenseList ?? []} onDelete={(id) => console.log(data, id)} />
      </Grid.Col>
    </>
  );
}
