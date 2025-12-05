import { useNavigate } from "react-router";
import type { ArticleDetails } from "../Pages/NewsPageLoader";
import Tag from "./UI/Tag";
import {
  articleDate,
  articleHeader,
  articleImgContainer,
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
          <p className={articleDate()}>{formatedDate}</p>
        </div>
        <div className={articleImgContainer()}>
          <img
            src={image ?? ""}
            alt={title}
            className={articleImgContainer()}
          />
        </div>
      </div>
      <p className="line-clamp-3">{article}</p>
    </article>
  );
}

export default ArticlePreview;
