import firebaseAdmin from "../common/firebase_admin.model";
import { IMemberInfo } from "./../interface/members.type";

async function memberFind(args: { user_id: string }): Promise<IMemberInfo | null> {
  const ref = firebaseAdmin.Firestore.collection("members");
  try {
    const userInfoSnap = await ref.doc(args.user_id).get();
    // 정보가 존재하지 않으면 null 반환
    if (userInfoSnap.exists === false) {
      return null;
    }
    return userInfoSnap.data() as IMemberInfo;
  } catch (err) {
    return null;
  }
}

async function memberAdd(args: IMemberInfo): Promise<IMemberInfo | null> {
  const ref = firebaseAdmin.Firestore.collection("members");
  try {
    await ref.doc(args.uid).set({
      ...args,
      id: args.uid,
    });
    return args;
  } catch (err) {
    return null;
  }
}

export { memberFind, memberAdd };
