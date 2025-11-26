import { useLocation, useParams } from "react-router";
import type { ArticleDetails } from "./NewsPageLoader";
import Article from "../Components/Article";

function ArticlePage() {
  const { iId } = useParams();
  const state = useLocation().state as ArticleDetails;
  const { article, createdAt, id, image, tags, title, views } = state;
  return <Article image={image} />;
}

export default ArticlePage;
