import { ExpenseInfo } from "../../../types/Expense.type";
import { convertExpenseListToMap } from "../convertExpenseListToMap";
describe("convertExpenseListToMap", () => {
  it("중복데이터를 넣으면 합산한 데이터를 반환한다", () => {
    const DATA: ExpenseInfo[] = [
      { payer: "a", price: 10000 },
      { payer: "a", price: 5000 },
      { payer: "b", price: 5000 },
    ];

    const total = DATA.reduce((total, info) => (total += info.price), 0);

    const result = convertExpenseListToMap(DATA, total);

    expect(result).toEqual([
      { payer: "a", price: 15000, part: 75 },
      { payer: "b", price: 5000, part: 25 },
    ]);
  });
});
