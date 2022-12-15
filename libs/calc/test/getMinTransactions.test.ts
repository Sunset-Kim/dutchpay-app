import { getMinTransaction } from "../getMinTransactions";

describe("getMinTransactions", () => {
  it("sholud return 2 transactions", () => {
    const list = [
      {
        payer: "a",
        price: 10000,
      },
      {
        payer: "b",
        price: 20000,
      },
      {
        payer: "c",
        price: 30000,
      },
      {
        payer: "d",
        price: 40000,
      },
    ];
    const result = getMinTransaction(list);

    expect(result).toHaveLength(2);
  });

  it("sholud return zero transactions", () => {
    const list = [
      {
        payer: "a",
        price: 10000,
      },
      {
        payer: "b",
        price: 10000,
      },
      {
        payer: "c",
        price: 10000,
      },
      {
        payer: "d",
        price: 10000,
      },
    ];
    const result = getMinTransaction(list);

    expect(result).toHaveLength(0);
  });
});
