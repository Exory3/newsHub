import { tv } from "tailwind-variants/lite";

export const sidebar = tv({
  base: "max-w-40 rounded-xl bg-slate-800 p-4 shadow-lg ",
});

export const sidebarHeader = tv({
  base: "mb-3 text-lg font-semibold text-white",
});

export const sidebarItem = tv({
  base: "flex items-center justify-between rounded-lg px-2 py-1 transition translate-y-3 hover:bg-slate-700",
});

export const sidebarLink = tv({
  base: "text-sm text-slate-200 hover:text-white line-clamp-1 text-ellipsis",
});

export const sidebarCount = tv({
  base: "w-6 text-right text-xs text-slate-400",
});
