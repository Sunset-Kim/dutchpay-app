import debug from "../../utils/debug_log";
import firebaseAdmin from "../common/firebase_admin.model";

const COLLECTION_NAME = "groups";

const log = debug("masa:model:Events");

class GroupModel {
  private EventsStore;

  constructor() {
    this.EventsStore = firebaseAdmin.Firestore.collection(COLLECTION_NAME);
  }

  OrdersCollection(eventId: string) {
    return this.EventsStore.doc(eventId).collection("orders");
  }

  async findAll(): Promise<any> {
    const groupListSnap = await this.EventsStore.get();

    if (groupListSnap.empty) {
      return;
    }

    return groupListSnap.docs.map((doc) => doc.data());
  }
}

export const Group = new GroupModel();
