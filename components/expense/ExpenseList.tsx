import NoContent from "@/components/common/NoContent";
import Price from "@/components/common/Price";
import { ExpenseInfo } from "@/types/Expense.type";
import { ActionIcon, ScrollArea, Table, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

interface ExpenseListProps {
  expenseList: ExpenseInfo[];
  onDelete?: (id: string) => void;
}

export default function ExpenseList({ expenseList, onDelete }: ExpenseListProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewport.current || !tableRef.current) return;
    viewport.current.scrollTo({ top: tableRef.current.clientHeight, behavior: "smooth" });
  }, [expenseList]);

  if (expenseList.length === 0) {
    return <NoContent>정산정보 입력창에서 정산정보를 추가해보세요!</NoContent>;
  }

  const rows = expenseList.map((expense, i) => {
    const { id, date, desc, payer, price } = expense;
    return (
      <tr key={`expense${i}`} data-testid="expenseItem">
        <td>
          <Text>{date ? dayjs(date).format("MM.DD") : "-"}</Text>
        </td>
        <td>
          <Text size={"sm"}>{payer}</Text>
        </td>
        <td>
          <Price value={price} />
        </td>
        <td>
          <Text
            lineClamp={1}
            align="left"
            sx={(theme) => ({
              width: 40,

              [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                width: "100px",
              },
            })}
          >
            {desc ?? "-"}
          </Text>
        </td>
        <td>
          {onDelete && (
            <ActionIcon color="red" title="delete expense list" onClick={() => onDelete(id)}>
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          )}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea h={380} viewportRef={viewport}>
      <Table striped highlightOnHover verticalSpacing="sm" align="center" ref={tableRef}>
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
