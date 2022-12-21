import { Grid } from "@mantine/core";
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
      <Grid.Col span={12} md={6} order={2} orderMd={1}>
        <AddExpenseForm members={members} onSubmit={addList} />
        <ExpenseSummary data={expenseList} />
      </Grid.Col>
      <Grid.Col span={12} md={6} order={1} orderMd={2}>
        <ExpenseList list={expenseList} />
      </Grid.Col>
    </>
  );
}
