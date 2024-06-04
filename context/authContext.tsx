import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IAuthContextProps } from "~/interfaces/AuthContext";
import { auth, db } from "~/utils/firebase";

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null || Object);
  const [isAuthenticated, setIsAuthenticated] = useState<undefined | boolean>(
    undefined
  );

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("got user: ", user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e: any) {
      let msg = e.message;

      if (msg.includes("(auth/invalid-email)")) {
        msg = "E-mail inválido";
      }

      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Credenciais inválidas.";
      }
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e: any) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    profileUrl: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });

      return { success: false, data: response?.user };
    } catch (e: any) {
      let msg = e.message;

      if (msg.includes("(auth/invalid-email)")) {
        msg = "E-mail inválido";
      }

      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "E-mail já cadastrado, tente outro e-mail.";
      }
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};
