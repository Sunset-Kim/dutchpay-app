import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import useGroup from "../hooks/useGroup";
import { ExpenseInfo } from "../types/Expense.type";

export default function ExpenseMain() {
  const { members, name } = useGroup();
  const [expenseList, setExpenseList] = useState<ExpenseInfo[]>([]);
  const addList = (info: ExpenseInfo) => setExpenseList([...expenseList, info]);

  return (
    <>
      <Grid.Col span={4}>
        <Stack w="full">
          <AddExpenseForm members={members} onSubmit={addList} />
          <ExpenseSummary data={expenseList} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <ExpenseList list={expenseList} />
      </Grid.Col>
    </>
  );
}
