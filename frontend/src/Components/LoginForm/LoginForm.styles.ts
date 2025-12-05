import { tv } from "tailwind-variants/lite";

export const loginStyle = tv({
  base: "flex flex-col gap-2 bg-gray-600 p-8 rounded-xl mx-auto",
});
export const loginTitle = tv({
  base: "text-center text-3xl",
});
export const loginError = tv({
  base: "text-xl text-red-400",
});
export const loginButton = tv({
  base: "mt-4 transform cursor-pointer rounded-sm border border-black bg-amber-600 py-1 hover:bg-amber-500",
});
export const loginTip = tv({
  base: "inline-block text-sm",
});
