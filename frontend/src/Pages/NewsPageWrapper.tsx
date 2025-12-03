import { useLocation } from "react-router";
import NewsPage from "./NewsPage";

function NewsPageWrapper() {
  const location = useLocation();
  return <NewsPage key={location.search} />;
}

export default NewsPageWrapper;
