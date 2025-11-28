import { Link, useLocation } from "react-router";
import type { ArticleDetails } from "./NewsPageLoader";
import Article from "../Components/Article";

function ArticlePage() {
  const state = useLocation().state as ArticleDetails;
  return (
    <div>
      <div className="flex justify-end">
        <Link
          to={`edit`}
          state={state}
          className="m-2 rounded-md bg-red-500 px-5 py-2 text-end transition hover:-translate-y-0.5"
        >
          Edit
        </Link>
      </div>
      <Article {...state} />
    </div>
  );
}

export default ArticlePage;
