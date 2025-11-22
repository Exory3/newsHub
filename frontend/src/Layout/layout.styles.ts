import { tv } from "tailwind-variants/lite";

//header
export const headerLogo = tv({
  base: "h-8 w-8 ",
});

export const headerStyle = tv({
  base: "mx-auto my-10 flex w-6/10 pb-4 justify-between",
});

//layout
export const main = tv({
  base: "w-8/10 m-auto mt-20",
});

//newsletter
export const NLForm = tv({
  base: "flex h-8 rounded-r-lg bg-slate-800",
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
