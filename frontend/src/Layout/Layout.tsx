import { Outlet } from "react-router";
import Header from "./Header";
import { layoutConatiner, main } from "./layout.styles";

export default function Layout() {
  return (
    <div className={layoutConatiner()}>
      <Header />
      <main className={main()}>
        <Outlet />
      </main>
    </div>
  );
}
