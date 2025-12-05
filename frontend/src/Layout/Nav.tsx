import NavItem from "./NavItem";
import { navContainer } from "./layout.styles";
import SubNavLink from "./SubNavLink";
import useRole from "../hooks/useRole";
import { Form } from "react-router";

function Nav() {
  const role = useRole();
  return (
    <nav className={navContainer()}>
      <NavItem label="news" activeLinks={["news", "hot", "world"]}>
        <SubNavLink to="/news">News</SubNavLink>
        <SubNavLink to="/news?filter=recent">Hot</SubNavLink>
        <SubNavLink to="news?filter=popular">Popular</SubNavLink>
      </NavItem>

      {role && (
        <NavItem label="editing" activeLinks={["create"]}>
          <SubNavLink to="/create">Create</SubNavLink>
        </NavItem>
      )}
      {!role ? (
        <SubNavLink to="/auth?mode=login">Login</SubNavLink>
      ) : (
        <Form method="post" action="/logout">
          <button className="cursor-pointer">Logout</button>
        </Form>
      )}
    </nav>
  );
}

export default Nav;
