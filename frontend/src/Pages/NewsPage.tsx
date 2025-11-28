import { useLoaderData } from "react-router";
import type { newsLoader } from "./NewsPageLoader";
import ArticlePreview from "../Components/ArticlePreview";

function NewsPage() {
  const { data } = useLoaderData<typeof newsLoader>();
  const { items } = data;
  // useEffect(() => {
  //   if (!parseId || Number.isNaN(parseId) || parseId <= 0)
  //     navigate("/news", { replace: true });
  // }, [navigate, parseId]);

  // const [article, setArticle] = useState<Partial<ArticleDetails>>({
  //   article: state.article ?? "",
  //   id: parseId,
  //   image: state.image ?? "",
  //   tags: state.tags ?? [],
  //   title: state.title ?? "",
  // });
  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <ArticlePreview key={item.id} {...item} />
      ))}
    </section>
  );
}

export default NewsPage;
