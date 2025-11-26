import { Link } from "react-router";
import { subNavItem } from "./layout.styles";

interface Props {
  to: string;
  children: React.ReactNode;
}

function SubNavLink({ to, children }: Props) {
  return (
    <Link className={subNavItem()} to={to}>
      {children}
    </Link>
  );
}

export default SubNavLink;
