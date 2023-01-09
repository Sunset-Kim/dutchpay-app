import { firestore } from "firebase-admin";
import debug from "../../utils/debug_log";
import firebaseAdmin from "../common/firebase_admin.model";
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
      const groupRef = await this.GroupsStore.doc(args.groupId).get();
      const expenseListRef = await this.GroupsStore.doc(args.groupId).collection(EXPENSE_COLLECTION_NAME).get();

      if (!groupRef.exists) {
        throw "not exist";
      }

      const expenseList = expenseListRef.empty ? undefined : expenseListRef.docs.map((doc) => doc.data());

      return {
        id: args.groupId,
        ...groupRef.data(),
        expenseList,
      };
    } catch (error) {
      log(error);
      return null;
    }
  }
}

export const groupsModel = new GroupModel();
