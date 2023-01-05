import { createContext, useContext } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { IAuth } from "../../types/Auth.type";

interface IAuthUserContext {
  authUser: IAuth | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthUserContext>({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => ({ user: null, credential: null }),
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
