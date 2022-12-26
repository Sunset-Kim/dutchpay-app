import { Center, Grid, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import AddExpenseForm from "../../components/AddExpenseForm";
import NoContent from "../../components/common/NoContent";
import ExpenseList from "../../components/ExpenseList";
import ExpenseSummary from "../../components/ExpenseSummary";
import useGroup from "../../hooks/useGroup";

export default function ExpenseMain() {
  const { query } = useRouter();
  const { groups, addExpenseList, deleteExpense } = useGroup();

  const notExist = !query.id || typeof query.id !== "string" || !groups.get(query.id as string);
  const group = groups.get(query.id as string)!;

  if (notExist) {
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
          <AddExpenseForm group={group} onSubmit={(expense) => addExpenseList(group, expense)} />
          <ExpenseSummary group={group} expenseList={group.expenseList ?? []} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} md={7} order={1} orderMd={2}>
        <ExpenseList expenseList={group.expenseList ?? []} onDelete={(id) => deleteExpense(group, id)} />
      </Grid.Col>
    </>
  );
}
