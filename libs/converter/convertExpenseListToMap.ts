import { ExpenseInfo } from "../../types/Expense.type";
import { ExpenseSegment } from "../../types/ExpenseSummary.type";

export function convertExpenseListToMap(data: ExpenseInfo[], total: number) {
  const map: Map<string, ExpenseSegment> = new Map();
  for (const { price, payer } of data) {
    const prev = map.get(payer);

    prev
      ? map.set(payer, { payer, price: prev.price + price, part: ((prev.price + price) / total) * 100 })
      : map.set(payer, { payer, price, part: (price / total) * 100 });
  }
  return map;
}
