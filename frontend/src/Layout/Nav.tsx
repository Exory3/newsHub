import NavItem from "./NavItem";
import SabNavLink from "./SabNavLink";

function Nav() {
  return (
    <nav>
      <NavItem label="News" activeLinks={["/new", "/hot", "/world"]}>
        <SabNavLink to="/new">New</SabNavLink>
        <SabNavLink to="/hot">Hot</SabNavLink>
        <SabNavLink to="/world">World News</SabNavLink>
      </NavItem>
    </nav>
  );
}

export default Nav;
