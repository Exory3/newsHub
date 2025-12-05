import { tv } from "tailwind-variants/lite";

export const articleStyle = tv({
  base: "cursor-pointer space-y-2  rounded-lg bg-slate-800 p-4 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl",
});

export const articleHeader = tv({
  base: " line-clamp-2 text-2xl font-bold capitalize",
});
export const articleImgContainer = tv({
  base: "max-h-40 w-full overflow-hidden",
});
export const articleImg = tv({
  base: "max-h-40 w-full object-cover",
});
export const articleSubHeader = tv({
  base: " flex items-start justify-between",
});
export const articleDate = tv({
  base: "py-0.5 text-xs",
});
export const articleTags = tv({
  base: " flex flex-wrap gap-2",
});

export const articleViews = tv({
  base: "text-sm opacity-60",
});
export const articleInfo = tv({
  base: "flex items-center justify-between",
});
