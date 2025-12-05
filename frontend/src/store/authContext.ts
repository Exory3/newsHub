import { createContext, useContext } from "react";

export type LoginFn = (data: AuthState) => void;

export type AuthState =
  | { status: "guest" }
  | {
      status: "authed";
      user: { id: number; email: string };
      role: "user" | "admin";
    };

export type Context = { auth: AuthState };

export const AuthContext = createContext<Context | null>(null);

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
export default useAuth;
