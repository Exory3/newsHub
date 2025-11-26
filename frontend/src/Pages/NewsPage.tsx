import { useLoaderData } from "react-router";
import type { newsLoader } from "./NewsPageLoader";
import ArticlePreview from "../Components/ArticlePreview";

function NewsPage() {
  const { data } = useLoaderData<typeof newsLoader>();
  const { items } = data;

  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <ArticlePreview key={item.id} {...item} />
      ))}
    </section>
  );
}

export default NewsPage;
