import { useNavigate } from "react-router";
import type { ArticleDetails } from "../Pages/NewsPageLoader";
import Tag from "./UI/Tag";
import {
  articleHeader,
  articleStyle,
  articleSubHeader,
  articleTags,
  articleViews,
} from "./ArticlePreview.styles";
import { BASEURL } from "../utils/constants";
import formatDate from "../utils/formetters";

type Props = ArticleDetails;
function ArticlePreview(props: Props) {
  const navigate = useNavigate();
  const { title, article, views, tags, id, image, createdAt } = props;
  const formatedDate = formatDate(createdAt);
  const handleNavigate = () => {
    fetch(BASEURL + `/news/${id}/view`, { method: "PATCH" });
    navigate(`/news/${id}`, { state: props });
  };

  return (
    <article tabIndex={0} className={articleStyle()} onClick={handleNavigate}>
      <div className="grid grid-cols-2">
        <div>
          <h1 className={articleHeader()}>{title}</h1>
          <div className={articleSubHeader()}>
            <div className={articleTags()}>
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
            <span className={articleViews()}>👁{views}</span>
          </div>
          <p className="py-0.5 text-xs">{formatedDate}</p>
        </div>
        <div className="max-h-40 w-full overflow-hidden">
          <img
            src={image ?? ""}
            alt={title}
            className="max-h-40 w-full object-cover"
          />
        </div>
      </div>
      <p className="line-clamp-3">{article}</p>
    </article>
  );
}

export default ArticlePreview;
