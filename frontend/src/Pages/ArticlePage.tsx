import { Link, useLocation, useParams, useSubmit } from "react-router";
import type { ArticleDetails } from "./NewsPageLoader";
import Article from "../Components/Article";
import useAuth from "../store/authContext";
import { useEffect, useState } from "react";
import { BASEURL } from "../utils/constants";
import Comments from "../Components/Comments/Comments";

function ArticlePage() {
  const { id } = useParams();
  if (Number.isNaN(id) || !id) throw new Error("id must be a number");
  const locationState = useLocation().state as ArticleDetails | undefined;
  const [article, setArticle] = useState<ArticleDetails | null>(
    locationState ?? null,
  );
  const { auth } = useAuth();
  const submit = useSubmit();

  useEffect(() => {
    if (article) return;

    const loadArticle = async () => {
      const res = await fetch(BASEURL + `/news/${id}`);
      if (!res.ok) throw new Error("Error loading this page");
      const { data } = (await res.json()) as { data: ArticleDetails };
      setArticle(data);
    };
    loadArticle();
  }, [article, id]);

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you wanna delete this article",
    );
    if (confirm) submit(null, { method: "DELETE" });
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <Article {...article} />
      <div>
        {auth.status === "authed" && auth.role === "admin" && (
          <button
            onClick={handleDelete}
            className="m-2 cursor-pointer rounded-md bg-red-500 px-5 py-2 transition hover:-translate-y-0.5"
          >
            Delete
          </button>
        )}
        {auth.status === "authed" && auth.role === "admin" && (
          <Link
            to={`edit`}
            state={article}
            className="m-2 inline-block rounded-md bg-green-700 px-5 py-2 transition hover:-translate-y-0.5"
          >
            Edit
          </Link>
        )}
      </div>
      <Comments />
    </div>
  );
}

export default ArticlePage;
