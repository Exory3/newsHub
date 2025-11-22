import { NavLink } from "react-router";
import logo from "../public/logo.png";
import { headerStyle, headerLogo } from "./layout.styles";
import Nav from "./Nav";
import NewsLetter from "./NewsLetter";

function Header() {
  return (
    <header className={headerStyle()}>
      <NavLink to={"/"}>
        <img src={logo} className={headerLogo()} />
      </NavLink>
      <Nav />
      <NewsLetter />
    </header>
  );
}

export default Header;
