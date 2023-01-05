import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import getConfig from "next/config";
import debug from "../../utils/debug_log";

const log = debug("Firebase:Auth:Singleton");

const { publicRuntimeConfig } = getConfig();

const FirebaseCredentials = {
  apiKey: publicRuntimeConfig.publicApiKey,
  authDomain: publicRuntimeConfig.authDomain,
  projectId: publicRuntimeConfig.projectId,
};

class FirebaseAuthClient {
  public static instance: FirebaseAuthClient;
  private init = false;
  private auth: Auth;

  public constructor() {
    if (this.init === false) {
      this.bootstrap();
    }

    this.auth = getAuth();
  }

  bootstrap() {
    log("bootstrap start");
    const apps = getApps();

    if (!!apps.length === true) {
      this.init = true;
      log("bootstrap stop");
      return;
    }

    initializeApp(FirebaseCredentials);
    this.auth = getAuth();
    this.init = true;

    log("bootstrap end");
  }

  get Auth(): Auth {
    return this.auth;
  }
}

const firebaseAuthClient = new FirebaseAuthClient();

export default firebaseAuthClient;
