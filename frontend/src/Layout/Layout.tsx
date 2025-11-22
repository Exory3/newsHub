import { Outlet } from "react-router";
import Header from "./Header";
import { main } from "./layout.styles";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={main()}>
        <Outlet />
      </main>
    </>
  );
}
