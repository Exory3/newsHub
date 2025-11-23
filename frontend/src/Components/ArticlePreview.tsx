import { Link } from "react-router";
import type { LoaderResponse } from "../Pages/RecentPageLoader";
import Tag from "./UI/Tag";

type Props = LoaderResponse;
function ArticlePreview({ title, article, views, tags }: Props) {
  console.log(tags);
  return (
    <article className="cursor-pointer gap-2 rounded-lg bg-slate-800 p-4 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
      <h1 className="line-clamp-2 text-3xl font-bold capitalize">{title}</h1>
      <div className="mb-1 flex items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>
              <Link to={`/news?tag=${tag}`}>{tag}</Link>
            </Tag>
          ))}
        </div>
        <span className="text-sm opacity-60">👁{views}</span>
      </div>
      <p className="line-clamp-3">{article}</p>
    </article>
  );
}

export default ArticlePreview;
