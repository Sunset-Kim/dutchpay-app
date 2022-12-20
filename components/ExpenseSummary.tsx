import { Button, Group, Stack } from "@mantine/core";
import { useRef } from "react";
import useGroup from "../hooks/useGroup";
import { convertExpenseListToMap } from "../libs/converter/convertExpenseListToMap";
import { exportPNG } from "../libs/exportImage/exportJpeg";
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
  const container = useRef<HTMLDivElement>(null);

  return (
    <>
      <Stack ref={container}>
        <ExpenseChart data={[...info.values()].sort((a, b) => b.price - a.price)} total={totalPrice} />
        <ExpenseResult data={[...info.values()].sort((a, b) => b.price - a.price)} members={members} />
      </Stack>
      <Group>
        <Button variant="outline" onClick={() => exportPNG(container.current)}>
          이미지로 내보내기
        </Button>
      </Group>
    </>
  );
}
