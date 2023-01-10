import { getExpenseSummary } from "../getExpenseSummary";

const DEFAULT_EXPENSE_LIST = [
  { payer: "a", price: 500, id: "a" },
  { payer: "a", price: 500, id: "a" },
  { payer: "a", price: 500, id: "a" },
  { payer: "a", price: 500, id: "a" },
  { payer: "b", price: 500, id: "a" },
  { payer: "b", price: 500, id: "a" },
];

describe("getExpenseSummary", () => {
  describe("expenseList가 제공 되지 않으면", () => {
    it("totalPrice: 0, expenseMap은 빈 map을 리턴한다", () => {
      const { totalPrice, expenseMap } = getExpenseSummary([]);

      expect(totalPrice).toBe(0);
      expect(expenseMap.size).toBe(0);
    });
  });

  describe("expenseList가 제공되면", () => {
    it("list의 정보를 요약한 totalPrice, expense map을 리턴한다", () => {
      const { totalPrice, expenseMap } = getExpenseSummary(DEFAULT_EXPENSE_LIST);

      expect(totalPrice).toBe(
        DEFAULT_EXPENSE_LIST.reduce((price, expense) => {
          price += expense.price;
          return price;
        }, 0)
      );
      expect(expenseMap.size).toBe(2);
      expect(expenseMap.get("a").price).toBe(2000);
      expect(expenseMap.get("b").price).toBe(1000);
    });
  });
});
