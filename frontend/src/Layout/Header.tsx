import { NavLink, useNavigation } from "react-router";
import logo from "../public/logo.png";
import { headerStyle, headerLogo } from "./layout.styles";
import Nav from "./Nav";
import NewsLetter from "./NewsLetter";

function Header() {
  const navigation = useNavigation();
  return (
    <>
      <header className={headerStyle()}>
        <NavLink to={"/"}>
          <img src={logo} className={headerLogo()} />
        </NavLink>
        <Nav />
        <NewsLetter />
      </header>
      {navigation.state === "loading" && <p>TODO spinner </p>}
    </>
  );
}

export default Header;
