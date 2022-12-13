import { ExpenseInfo } from "../types/Expense.type";
import dayjs from "dayjs";

interface ExpenseItemProps {
  data: ExpenseInfo;
}

export default function ExpenseItem({ data }: ExpenseItemProps) {
  const { payer, price, date, desc } = data;
  return (
    <div data-testid={"expenseItem"}>
      {date && <div>{dayjs(date).format("YYYY-MM-DD")}</div>}
      <div>{payer}</div>
      {desc && <div>{desc}</div>}
      <div>{price}</div>
    </div>
  );
}
