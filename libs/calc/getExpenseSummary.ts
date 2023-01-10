import { IGroup } from "@/types/Group.type";

export function getExpenseSummary(data: IGroup["expenseList"]) {
  let totalPrice = 0;
  const expenseMap: Map<string, any> = new Map();

  if (data === undefined) {
    return {
      totalPrice,
      expenseMap,
    };
  }

  for (const { price, payer } of data) {
    const prev = expenseMap.get(payer);

    totalPrice += price;

    prev ? expenseMap.set(payer, { payer, price: prev.price + price }) : expenseMap.set(payer, { payer, price });
  }

  return {
    totalPrice,
    expenseMap,
  };
}
