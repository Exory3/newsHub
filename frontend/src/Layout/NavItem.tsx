import { useState } from "react";
import { useLocation } from "react-router";
import { navItem, subNavMenu } from "./layout.styles";

interface Props {
  label: string;
  children: React.ReactNode;
  activeLinks: string[];
}
function NavItem({ label, children, activeLinks }: Props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const firstSegment = "/" + location.pathname.split("/")[1];
  const isActive = activeLinks.includes(firstSegment);
  const isMobile = window.innerWidth < 768;

  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  const handleToggleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={isMobile ? handleToggleClick : undefined}
      className="relative"
    >
      <button className={navItem({ isActive })}>{label}</button>
      {open && (
        <div className={subNavMenu()} onClick={handleMouseLeave}>
          {children}
        </div>
      )}
    </div>
  );
}

export default NavItem;
