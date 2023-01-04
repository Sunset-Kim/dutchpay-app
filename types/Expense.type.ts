import { AddExpense } from "../models/expense/schema/expense.add.schema";
import { FirebaseTimestamp } from "./common/FireBaseTimestamp";

export interface ExpenseInfo extends AddExpense {
  id: string;
  createdAt: FirebaseTimestamp;
}
