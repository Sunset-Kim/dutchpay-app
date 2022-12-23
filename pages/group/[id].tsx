import { Center, Grid, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import AddExpenseForm from "../../components/AddExpenseForm";
import NoContent from "../../components/common/NoContent";
import ExpenseList from "../../components/ExpenseList";
import ExpenseSummary from "../../components/ExpenseSummary";
import useGroup from "../../hooks/useGroup";
import { ExpenseInfo } from "../../types/Expense.type";

export default function ExpenseMain() {
  const { query } = useRouter();
  const { groups } = useGroup();
  const [expenseList, setExpenseList] = useState<ExpenseInfo[]>([]);

  const deleteExpense = (id: string) => setExpenseList((prev) => prev.filter((expense) => expense.id !== id));

  // TODO: update list 추가예정
  // const updateExpense = (newExpense: ExpenseInfo) =>
  //   setExpenseList((prev) =>
  //     prev.map((expense) => {
  //       if (expense.id === newExpense.id) {
  //         return newExpense;
  //       }
  //       return expense;
  //     })
  //   );

  if (!query.id || typeof query.id !== "string" || !groups.get(query.id)) {
    return (
      <Grid.Col span={12}>
        <Center>
          <NoContent title="500 Error">에러가 발생했습니다. 관리자에게 문의해주세요</NoContent>
        </Center>
      </Grid.Col>
    );
  }

  const group = groups.get(query.id)!;
  const addList = (info: ExpenseInfo) => setExpenseList([...expenseList, info]);

  return (
    <>
      <Grid.Col span={12} md={5} order={2} orderMd={1}>
        <Stack>
          <AddExpenseForm group={group} onSubmit={addList} />
          <ExpenseSummary group={group} expenseList={expenseList} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} md={7} order={1} orderMd={2}>
        <ExpenseList expenseList={expenseList} onDelete={deleteExpense} />
      </Grid.Col>
    </>
  );
}
