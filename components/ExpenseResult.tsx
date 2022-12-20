import { Box, Divider, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { getMinTransaction } from "../libs/calc/getMinTransactions";
import { formatKRWCurrency } from "../libs/formater";
import { ExpenseSegment } from "../types/ExpenseSummary.type";

interface ExpenseResultProps {
  data: ExpenseSegment[];
  total: number;
  members: string[];
}

export default function ExpenseResult({ data, total, members }: ExpenseResultProps) {
  const transactions = getMinTransaction(data, members);

  if (transactions.length === 0) {
    return (
      <Paper withBorder p="md" radius="md">
        <Text size="xl" weight={700}>
          아직 정산할 금액은 없네요!
        </Text>
      </Paper>
    );
  }
  return (
    <Paper withBorder p="md" radius="md">
      <Text py="sm" size="xl" weight={700}>
        정산해볼까요?
      </Text>
      <Divider />
      <Box my="sm">
        {transactions.map((transaction) => {
          const { sender, receiver, amount } = transaction;
          return (
            <div key={`transaction${sender}${receiver}${amount}`}>
              {`${sender} 님이 ${receiver} 님에게 ${formatKRWCurrency(amount)}를 송금해야합니다`}
            </div>
          );
        })}
      </Box>
    </Paper>
  );
}
