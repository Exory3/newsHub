import { Link } from "react-router";
import { subNavItem } from "./nav.styles";

interface Props {
  to: string;
  children: React.ReactNode;
}

function SabNavLink({ to, children }: Props) {
  return (
    <Link className={subNavItem()} to={to}>
      {children}
    </Link>
  );
}

export default SabNavLink;
