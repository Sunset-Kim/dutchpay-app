import * as admin from "firebase-admin";
import debug from "../../utils/debug_log";

const log = debug("Server:FirebaseAdmin:");

interface Config {
  databaseurl: string;
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

class FirebaseAdmin {
  static instance: FirebaseAdmin;
  private init = false;

  constructor() {
    if (FirebaseAdmin.instance) {
      return FirebaseAdmin.instance;
    }

    this.bootstrap();
  }

  /** firestore */
  get Firestore(): FirebaseFirestore.Firestore {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.firestore();
  }

  get Auth(): admin.auth.Auth {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.auth();
  }

  private bootstrap(): void {
    log("bootstrap start");
    if (!!admin.apps.length === true) {
      this.init = true;
      log("bootstrap stop find alreadys app");
      return;
    }

    const config: Config = {
      databaseurl: process.env.databaseurl || "",
      credential: {
        privateKey: (process.env.privateKey || "").replace(/\\n/g, "\n"),
        clientEmail: process.env.clientEmail || "",
        projectId: process.env.projectId || "",
      },
    };

    admin.initializeApp({
      databaseURL: config.databaseurl,
      credential: admin.credential.cert(config.credential),
    });

    this.init = true;
    log("bootstrap end");
  }
}
const firebaseAdmin = new FirebaseAdmin();
export default firebaseAdmin;
