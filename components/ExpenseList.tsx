import { ActionIcon, Group, Paper, ScrollArea, Table, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import { ExpenseInfo } from "../types/Expense.type";
import NoContent from "./common/NoContent";
import Price from "./Price";

interface ExpenseListProps {
  expenseList: ExpenseInfo[];
}

export default function ExpenseList({ expenseList }: ExpenseListProps) {
  if (expenseList.length === 0) {
    return <NoContent>정산정보 입력창에서 정산정보를 추가해보세요!</NoContent>;
  }

  const rows = expenseList.map((expense, i) => {
    const { date, desc, payer, price } = expense;
    return (
      <tr key={`expense${i}`} data-testid="expenseItem">
        <td>
          <Text>{date ? dayjs(date).format("YYYY-MM-DD") : "-"}</Text>
        </td>
        <td>
          <Text size={"sm"}>{payer}</Text>
        </td>
        <td>
          <Price value={price} />
        </td>
        <td>
          <Text align="left">{desc ?? "-"}</Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Paper component={ScrollArea} withBorder shadow={"sm"} p={20} h={700}>
      <Table verticalSpacing="sm" align="center">
        <thead>
          <tr>
            <th>날짜</th>
            <th>사용자</th>
            <th>비용</th>
            <th>메모</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
}
