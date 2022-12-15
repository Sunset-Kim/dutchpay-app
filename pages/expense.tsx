import { GridItem } from "@chakra-ui/react";
import { Box, Stack } from "@mantine/core";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import { EXPENSE_INFO_LIST } from "../fixture/expense";

export default function ExpenseMain() {
  const MEMBERS = ["김영식"];
  return (
    <>
      <GridItem colSpan={4}>
        <Stack w="full">
          <AddExpenseForm members={MEMBERS} onSubmit={console.log} />
          <ExpenseSummary data={EXPENSE_INFO_LIST} />
        </Stack>
      </GridItem>
      <GridItem colSpan={8}>
        <ExpenseList list={EXPENSE_INFO_LIST} />
      </GridItem>
    </>
  );
}
