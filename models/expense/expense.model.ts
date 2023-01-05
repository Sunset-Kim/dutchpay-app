import { firestore } from "firebase-admin";
import debug from "../../utils/debug_log";
import firebaseAdmin from "../common/firebase_admin.model";
import { AddExpense } from "./schema/expense.add.schema";

const GROUP_COLLECTION_NAME = "groups";
const EXPENSE_COLLECTION_NAME = "expenseList";

const log = debug("Server:model:Groups");

class ExpenseModel {
  private GroupsStore;

  constructor() {
    this.GroupsStore = firebaseAdmin.Firestore.collection(GROUP_COLLECTION_NAME);
  }

  async addExpense(args: { groupId: string; expense: AddExpense }) {
    log(args);
    const { groupId, expense } = args;
    try {
      const expenseRef = this.GroupsStore.doc(groupId).collection(EXPENSE_COLLECTION_NAME).doc();

      const res = await expenseRef.set({
        id: expenseRef.id,
        ...expense,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      log(expenseRef.id);

      return {
        expenseId: expenseRef.id,
        createdAt: res.writeTime,
      };
    } catch (error) {
      log(error);
      return null;
    }
  }

  async deleteExpense(args: { groupId: string; expenseId: string }) {
    log(args);
    const { groupId, expenseId } = args;
    try {
      const res = await this.GroupsStore.doc(groupId).collection(EXPENSE_COLLECTION_NAME).doc(expenseId).delete();

      log(res);
      return {
        updateAt: res.writeTime,
      };
    } catch (error) {
      log(error);
      return null;
    }
  }
}

export const expenseModel = new ExpenseModel();
