import { ActionIcon, Badge, Group, ScrollArea, Table, Text } from "@mantine/core";
import { ExpenseInfo } from "../types/Expense.type";
import dayjs from "dayjs";
import NoContent from "./NoContent";
import { IconPencil, IconTrash } from "@tabler/icons";
import Price from "./Price";

interface ExpenseListProps {
  list: ExpenseInfo[];
}

export default function ExpenseList({ list }: ExpenseListProps) {
  if (list.length === 0) {
    return <NoContent>정산정보 입력창에서 정산정보를 추가해보세요!</NoContent>;
  }

  const rows = list.map((expense, i) => {
    const { date, desc, payer, price } = expense;
    return (
      <tr key={`expense${i}`}>
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
    <ScrollArea>
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
    </ScrollArea>
  );
}
