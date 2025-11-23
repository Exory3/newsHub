import { useLoaderData } from "react-router";
import type { newLoader } from "./RecentPageLoader";
import ArticlePreview from "../Components/ArticlePreview";

function RecentPage() {
  const { data } = useLoaderData<typeof newLoader>();
  const { items } = data;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <ArticlePreview key={item.id} {...item} />
      ))}
    </section>
  );
}

export default RecentPage;
