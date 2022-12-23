import { Button, Group, Stack } from "@mantine/core";
import { useRef } from "react";
import { convertExpenseListToMap } from "../libs/converter/convertExpenseListToMap";
import { exportPNG } from "../libs/exportImage/exportJpeg";
import { ExpenseInfo } from "../types/Expense.type";
import { IGroup } from "../types/Group.type";

import ExpenseChart from "./ExpenseChart";
import ExpenseResult from "./ExpenseResult";

interface ExpenseSummaryProps {
  expenseList: ExpenseInfo[];
  group: IGroup;
}

export default function ExpenseSummary({ expenseList, group }: ExpenseSummaryProps) {
  const totalPrice = expenseList?.reduce((total, info) => (total += info.price), 0);
  const info = convertExpenseListToMap(expenseList, totalPrice);
  const container = useRef<HTMLDivElement>(null);

  return (
    <Stack>
      <Stack ref={container}>
        <ExpenseChart data={[...info.values()].sort((a, b) => b.price - a.price)} total={totalPrice} />
        <ExpenseResult data={[...info.values()].sort((a, b) => b.price - a.price)} members={group.members} />
      </Stack>
      <Group>
        <Button variant="outline" onClick={() => exportPNG(container.current, { maxWidth: 320 })}>
          이미지로 내보내기
        </Button>
      </Group>
    </Stack>
  );
}
