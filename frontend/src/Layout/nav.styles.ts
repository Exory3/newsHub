import { tv } from "tailwind-variants/lite";

//SabNavItem
export const subNavItem = tv({
  base: "block px-2 py-2 hover:text-blue-300",
});

//NavItem
export const subNavMenu = tv({
  base: "absolute left-0 mb-2 text-amber-300  rounded-sm border border-amber-600 p-2 shadow-lg overflow-hidden  min-w-30",
});

export const navItem = tv({
  base: "cursor-pointer px-4 text-amber-300",
  variants: {
    isActive: {
      true: " border-b-2 border-b-emerald-500",
      false: "",
    },
  },
});
