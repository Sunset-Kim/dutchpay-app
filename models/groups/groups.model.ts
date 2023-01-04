import { firestore } from "firebase-admin";
import ExpenseList from "../../components/ExpenseList";
import debug from "../../utils/debug_log";
import firebaseAdmin from "../common/firebase_admin.model";
import { ExpenseInfo } from "./schema/expense.schema";
import { IAddGroups } from "./schema/groups.add.schema";

const GROUP_COLLECTION_NAME = "groups";
const EXPENSE_COLLECTION_NAME = "expenseList";

const log = debug("Server:model:Groups");

class GroupModel {
  private GroupsStore;

  constructor() {
    this.GroupsStore = firebaseAdmin.Firestore.collection(GROUP_COLLECTION_NAME);
  }

  async addGroups(args: IAddGroups) {
    log(args);
    try {
      const result = await this.GroupsStore.add({
        ...args,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      return {
        groupId: result.id,
      };
    } catch (error) {
      log(error);
      return null;
    }
  }

  async updateGroup(args: IAddGroups) {
    log(args);
    try {
      const result = await this.GroupsStore.doc().update({
        ...args,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      return;
    } catch (error) {
      log(error);
      return null;
    }
  }

  async deleteGroup(args: { groupId: string }) {
    log(args);

    try {
      await this.GroupsStore.doc(args.groupId).delete();
      return "delete";
    } catch (error) {
      log(error);
      return null;
    }
  }

  async findAllGroups(args: { ownerId: string }) {
    log(args);

    try {
      const groupListSnap = await this.GroupsStore.where("ownerId", "==", args.ownerId).get();
      if (groupListSnap.empty) {
        return [];
      }
      return groupListSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      log(error);
      return null;
    }
  }

  async findGroup(args: { groupId: string }) {
    log(args);
    try {
      const group = await this.GroupsStore.doc(args.groupId).get();

      if (!group.exists) {
        return;
      }

      return {
        id: args.groupId,
        ...group.data(),
      };
    } catch (error) {
      log(error);
      return null;
    }
  }

  async addExpense(args: { groupId: string; expenseList: ExpenseInfo }) {
    log(args);
    try {
      const expenseRef = this.GroupsStore.doc(args.groupId).collection(EXPENSE_COLLECTION_NAME);
      return expenseRef.add(ExpenseList);
    } catch (error) {
      log(error);
      return null;
    }
  }

  async deleteExpense(args: { groupId: string; expenseId: string }) {
    log(args);
    try {
      await this.GroupsStore.doc(args.groupId).collection(EXPENSE_COLLECTION_NAME).doc(args.expenseId).delete();
      return;
    } catch (error) {
      log(error);
      return null;
    }
  }
}

export const groupsModel = new GroupModel();
