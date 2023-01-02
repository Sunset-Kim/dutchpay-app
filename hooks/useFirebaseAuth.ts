import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseAuthClient from "../models/common/firebase_auth_client.model";
import { IMemberInfo } from "../models/interface/members.type";
import { memberAdd, memberFind } from "../services/members.client.service";
import { IAuth } from "../types/Auth.type";
import debug from "../utils/debug_log";

const log = debug("useAuth");

function formatAuthUser(user: User): IAuth {
  return {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
  };
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<IAuth | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
  };

  async function signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const signInResult = await signInWithPopup(firebaseAuthClient.Auth, provider);

      if (signInResult.user) {
        const idToken = await signInResult.user.getIdToken();
        const findResp = await memberFind({ member_id: signInResult.user.uid, isServer: false });

        if (!(findResp.status === 200 && findResp.payload && findResp.payload.uid === signInResult.user.uid)) {
          const { uid, displayName, email, photoURL } = signInResult.user;
          const data: IMemberInfo = {
            uid,
            displayName: displayName || undefined,
            email: email || undefined,
            photoURL: photoURL || undefined,
          };
          await memberAdd({
            data,
            token: idToken,
            isServer: false,
          });
        }
      }
    } catch (err) {
      log(err);
    }
  }

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseAuthClient.Auth.signOut();
      clear();
    } catch (error) {
      log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuthClient.Auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
