import { Link } from "react-router";
import { tv } from "tailwind-variants/lite";

const TagStyle = tv({
  base: " p-0.5 rounded-md box-border text-sm leading-none text-center  border border-amber-400",
});

function Tag({ tag }: { tag: string }) {
  return (
    <span className={TagStyle()}>
      <Link to={`/news?tag=${tag}`} onClick={(e) => e.stopPropagation()}>
        {tag}
      </Link>
    </span>
  );
}

export default Tag;
