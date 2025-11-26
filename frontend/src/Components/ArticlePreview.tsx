import { Link, useNavigate } from "react-router";
import type { ArticleDetails } from "../Pages/NewsPageLoader";
import Tag from "./UI/Tag";
import {
  articleHeader,
  articleStyle,
  articleSubHeader,
  articleTags,
  articleViews,
} from "./ArticlePreview.styles";

type Props = ArticleDetails;
function ArticlePreview(props: Props) {
  const navigate = useNavigate();
  const { title, article, views, tags, id, image } = props;
  console.log(image);
  return (
    <article
      tabIndex={0}
      className={articleStyle()}
      onClick={() => navigate(`/news/${id}`, { state: props })}
    >
      <h1 className={articleHeader()}>{title}</h1>
      <div className={articleSubHeader()}>
        <div className={articleTags()}>
          {tags.map((tag) => (
            <Tag key={tag}>
              <Link to={`/news?tag=${tag}`}>{tag}</Link>
            </Tag>
          ))}
        </div>
        <span className={articleViews()}>👁{views}</span>
      </div>
      <p className="line-clamp-3">{article}</p>
    </article>
  );
}

export default ArticlePreview;
