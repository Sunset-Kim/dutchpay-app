export const TRANSACTION_TEST_ONE_PAYER_ONE_MEMBER = {
  expenses: [
    {
      payer: "a",
      price: 10000,
    },
  ],
  members: ["a"],
  totalPrice: 10000,
};

export const TRANSACTION_TEST_ONE_PAYER_FOUR_MEMBERS = {
  expenses: [
    {
      payer: "a",
      price: 10000,
    },
  ],
  members: ["a", "b", "c", "d"],
  totalPrice: 10000,
};

export const TRANSACTION_TEST_SAME_PRICE = {
  expenses: [
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
  ],
  members: ["a", "b", "c", "d"],
  totalPrice: 40000,
};

export const TRANSACTION_TEST_WO_TRANSACTION = {
  expenses: [],
  members: ["a", "b", "c", "d"],
  totalPrice: 0,
};
