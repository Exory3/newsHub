import { tv } from "tailwind-variants/lite";

//layout
export const layoutConatiner = tv({
  base: "flex min-h-screen flex-col",
});

export const main = tv({
  base: "flex-1 flex flex-col items-start p-8 ",
});
export const body = tv({
  base: "grid grid-cols-[200px_minmax(900px,1fr)] items-start",
});

//header
export const headerLogo = tv({
  base: "h-8 w-8 ",
});

export const headerStyle = tv({
  base: "mx-auto py-8 flex w-6/10 justify-between shrink-0",
});

//newsletter
export const NLForm = tv({
  base: "flex h-8 rounded-r-lg bg-slate-800 text-amber-300",
});

export const NLInput = tv({
  base: "mr-1 max-w-xs flex-1 bg-slate-600 px-1 text-sm focus:outline-1",
});

export const NLInfo = tv({
  base: "text-sm text-green-400",
});

export const NLError = tv({
  base: "text-sm text-red-400",
});

//Nav

export const navContainer = tv({
  base: "flex flex-1 justify-center gap-12 px-10 items-center",
});
//SabNavItem
export const subNavItem = tv({
  base: "block px-2 py-2 hover:text-blue-300 ",
});

//NavItem
export const subNavMenu = tv({
  base: " z-10 absolute  mb-2 text-amber-300  bg-gray-800 rounded-sm border border-amber-600 p-2 shadow-lg overflow-hidden  min-w-40",
});

export const navItem = tv({
  base: "cursor-pointer px-4 text-amber-300 capitalize ",
  variants: {
    isActive: {
      true: " border-b-2 border-b-emerald-500",
      false: "",
    },
  },
});
