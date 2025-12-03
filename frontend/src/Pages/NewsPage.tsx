import { useLoaderData } from "react-router";
import type { newsLoader } from "./NewsPageLoader";
import ArticlePreview from "../Components/ArticlePreview";
import { useEffect, useRef, useState } from "react";
import { BASEURL } from "../utils/constants";

function NewsPage() {
  const observerRef = useRef(null);
  const { data } = useLoaderData<typeof newsLoader>();

  const [articles, setArticles] = useState(() => data.items);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(data.page);

  const hasMore = data.total > page * data.limit;

  useEffect(() => {
    setArticles(data.items);
    setPage(data.page);
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const div = entries[0];
        if (div.isIntersecting && hasMore) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0, rootMargin: "100px" },
    );
    const current = observerRef.current;
    if (!current) return;
    if (!hasMore) observer.disconnect();
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [hasMore]);

  useEffect(() => {
    if (page === data.page) return;
    const load = async () => {
      const res = await fetch(BASEURL + `/news?page=${page}&limit=10`);
      if (!res.ok) return;
      const json = (await res.json()) as Awaited<ReturnType<typeof newsLoader>>;
      setLoading(false);
      setArticles((prev) => [...prev, ...json.data.items]);
    };
    load();
  }, [page, data.page]);

  return (
    <>
      {(!articles || articles.length === 0) && (
        <p className="mx-auto text-4xl">No articles found for your request</p>
      )}
      <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {articles.map((item) => (
          <ArticlePreview key={item.id} {...item} />
        ))}
        <div ref={observerRef}></div>
        {loading && <p>Loading more...</p>}
      </section>
    </>
  );
}

export default NewsPage;
