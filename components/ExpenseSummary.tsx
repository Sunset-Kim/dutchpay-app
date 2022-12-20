import { Stack } from "@mantine/core";
import useGroup from "../hooks/useGroup";
import { convertExpenseListToMap } from "../libs/converter/convertExpenseListToMap";
import { ExpenseInfo } from "../types/Expense.type";

import ExpenseChart from "./ExpenseChart";
import ExpenseResult from "./ExpenseResult";

interface ExpenseSummaryProps {
  data: ExpenseInfo[];
}

export default function ExpenseSummary({ data }: ExpenseSummaryProps) {
  const { members } = useGroup();
  const totalPrice = data?.reduce((total, info) => (total += info.price), 0);
  const info = convertExpenseListToMap(data, totalPrice);

  return (
    <Stack>
      <ExpenseChart data={[...info.values()].sort((a, b) => b.price - a.price)} total={totalPrice} />
      <ExpenseResult data={[...info.values()].sort((a, b) => b.price - a.price)} members={members} />
    </Stack>
  );
}
