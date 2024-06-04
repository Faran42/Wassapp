import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<undefined | boolean>(
    undefined
  );

  useEffect(() => {
    // onAuthStateChanged

    // setTimeout(() => {
    setIsAuthenticated(false);
    // }, 1000);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (e) {}
  };

  const logout = async (email, password) => {
    try {
    } catch (e) {}
  };

  const register = async (email, password, username, profileUrl) => {
    try {
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}>
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
