import { ExpenseInfo } from "../../types/Expense.type";

export const EXPENSE_INFO_WITHOUT_DATE: ExpenseInfo = {
  payer: "김영식",
  price: 100000,
};

export const EXPENSE_INFO_WITH_DATE: ExpenseInfo = {
  payer: "김영식",
  price: 100000,
  date: new Date("2022-12-12"),
};

export const EXPENSE_INFO_LIST: ExpenseInfo[] = [
  {
    payer: "김영식",
    price: 100000,
  },
  {
    payer: "김철수",
    price: 20000,
  },
  {
    payer: "오박사",
    price: 90000,
  },
  {
    payer: "김영식",
    price: 9000,
  },
];
