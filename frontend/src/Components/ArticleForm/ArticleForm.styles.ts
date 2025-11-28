import { tv } from "tailwind-variants/lite";

export const formStyle = tv({
  base: "bg-gray-700 p-6 pb-0 flex flex-col flex-1 min-h-0 w-full",
});

export const formGrid = tv({
  base: "grid  gap-4 md:grid-cols-2 mb-4 ",
});

export const formGridItem = tv({
  base: "flex gap-2 items-center ",
});
export const formInput = tv({
  base: `
    flex-1 rounded-md px-2 py-1 transition-colors
    bg-slate-300 border border-slate-600 text-slate-900
    placeholder:text-slate-400
    focus:border-blue-500 focus:outline-none 
    
  `,
});

export const textAreaContainer = tv({
  base: "flex min-h-0 flex-1 flex-col",
});
export const formActions = tv({
  base: "flex justify-end gap-4 p-2",
});

export const actionButtons = tv({
  base: "cursor-pointer bg-slate-900 px-4 py-1 rounded-md hover:text-blue-300 transform hover:-translate-y-0.5",
});
