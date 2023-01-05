import firebaseAdmin from "../models/common/firebase_admin.model";
import debug from "./debug_log";

const log = debug("FB Auth:Utils:verify_token");

async function verifyToken(token: string | undefined) {
  if (token === undefined) {
    log("token undefined");
    throw Error("token undefined");
  }

  try {
    const decodedToken = await firebaseAdmin.Auth.verifyIdToken(token);
    log("complete decode");
    return decodedToken;
  } catch (error) {
    log(error);
    throw Error("firebase auth vreify error");
  }
}

export default verifyToken;
