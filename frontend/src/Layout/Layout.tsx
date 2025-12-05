import { Outlet, useLoaderData } from "react-router";
import Header from "./Header";
import { body, layoutConatiner, main } from "./layout.styles";
import { AuthContext, type AuthState } from "../store/authContext";
import Sidebar from "./Sidebar";

export default function Layout() {
  const { auth } = useLoaderData() as { auth: AuthState };

  const value = { auth };
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
