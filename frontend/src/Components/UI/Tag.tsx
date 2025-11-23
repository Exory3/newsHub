import { tv } from "tailwind-variants/lite";

const TagStyle = tv({
  base: " p-0.5 rounded-md box-border text-sm leading-none text-center  border border-amber-400",
});

function Tag({ children }: { children: React.ReactNode }) {
  return <span className={TagStyle()}>{children}</span>;
}

export default Tag;
