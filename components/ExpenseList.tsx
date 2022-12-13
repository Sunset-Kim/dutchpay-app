import { ExpenseInfo } from "../types/Expense.type";
import ExpenseItem from "./ExpenseItem";
import NoContent from "./NoContent";

interface ExpenseListProps {
  list: ExpenseInfo[];
}

export default function ExpenseList({ list }: ExpenseListProps) {
  if (list.length === 0) {
    return <NoContent>정산정보를 추가해 주세요</NoContent>;
  }

  return (
    <ul>
      {list.map((expense, i) => (
        <li key={`expense${i}`}>
          <ExpenseItem data={expense} />
        </li>
      ))}
    </ul>
  );
}
