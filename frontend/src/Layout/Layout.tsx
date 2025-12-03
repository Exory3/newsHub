import { Outlet, useLoaderData } from "react-router";
import Header from "./Header";
import { body, layoutConatiner, main } from "./layout.styles";
import { useState } from "react";
import {
  AuthContext,
  type AuthState,
  type LoginFn,
} from "../store/authContext";
import { BASEURL } from "../utils/constants";
import Sidebar from "./Sidebar";

export default function Layout() {
  const { auth: initialAuth } = useLoaderData() as { auth: AuthState };
  const [auth, setAuth] = useState<AuthState>(initialAuth);

  const login: LoginFn = (data) => {
    setAuth(data);
  };

  const logout = async () => {
    await fetch(BASEURL + "/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuth({ status: "guest" });
  };

  const value = { auth, login, logout };
  return (
    <AuthContext value={value}>
      <div className={layoutConatiner()}>
        <Header />
        <div className={body()}>
          <Sidebar />
          <main className={main()}>
            <Outlet />
          </main>
        </div>
      </div>
    </AuthContext>
  );
}
