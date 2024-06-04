import { User as FirebaseUser } from "firebase/auth";
export interface IAuthContextLoginProps {
  email: string;
  password: string;
}

export interface IAuthContextRegisterProps {
  username: string;
  email: string;
  password: string;
  profileUrl: string;
}

export interface IAuthContextProps {
  user: FirebaseUser | null;
  isAuthenticated: boolean | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    msg?: string;
  }>;
  logout: () => Promise<{ success: boolean; msg?: string }>;
  register: (
    username: string,
    email: string,

    password: string,
    profileUrl: string
  ) => Promise<{
    success: boolean;
    data?: FirebaseUser;
    msg?: string;
  }>;
}
