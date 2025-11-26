import NavItem from "./NavItem";
import { navContainer } from "./layout.styles";
import SubNavLink from "./SubNavLink";

function Nav() {
  return (
    <nav className={navContainer()}>
      <NavItem label="news" activeLinks={["/news", "/hot", "/world"]}>
        <SubNavLink to="/news">News</SubNavLink>
        <SubNavLink to="/hot">Hot</SubNavLink>
        <SubNavLink to="/world">World News</SubNavLink>
      </NavItem>
      <NavItem label="editing" activeLinks={["/add"]}>
        <SubNavLink to="/add">Create</SubNavLink>
      </NavItem>
    </nav>
  );
}

export default Nav;
