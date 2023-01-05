import firebaseAuthClient from "../models/common/firebase_auth_client.model";
import { AddExpense } from "../models/expense/schema/expense.add.schema";
import { getBaseUrl } from "../utils/getBaseUrl";
import { FirebaseTimestamp } from "./../types/common/FireBaseTimestamp";
import { requester, Resp } from "./requester";

export default class ExpenseClientService {
  private static instance: ExpenseClientService;
  private hostAndPort: string = getBaseUrl(false);
  private baseUrl: string = `${this.hostAndPort}/api/expense`;
  private constructor() {}

  static getInstance(): ExpenseClientService {
    if (!ExpenseClientService.instance) {
      ExpenseClientService.instance = new ExpenseClientService();
    }
    return ExpenseClientService.instance;
  }

  async add({
    groupId,
    expense,
  }: {
    groupId: string;
    expense: AddExpense;
  }): Promise<Resp<{ expenseId: string; createdAt: FirebaseTimestamp }>> {
    const url = `${this.baseUrl}/${groupId}`;
    const token = await firebaseAuthClient.Auth.currentUser?.getIdToken();

    try {
      return await requester({
        option: {
          method: "POST",
          url,
          data: expense,
          headers: {
            authorization: token,
          },
        },
      });
    } catch (error) {
      return {
        status: 500,
      };
    }
  }

  async delete({ groupId, expenseId }: { groupId: string; expenseId: string }) {
    const url = `${this.baseUrl}/${groupId}?expenseId=${expenseId}`;
    const token = await firebaseAuthClient.Auth.currentUser?.getIdToken();

    try {
      return await requester({
        option: {
          method: "DELETE",
          url,
          headers: {
            authorization: token,
          },
        },
      });
    } catch (error) {
      return {
        status: 500,
      };
    }
  }
}
