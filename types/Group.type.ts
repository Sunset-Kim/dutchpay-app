import { ExpenseInfo } from "./Expense.type";

export interface IGroup {
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  id: string;
  members: string[];
  name: string;
  ownerId: string;
  expenseList: ExpenseInfo[];
}
