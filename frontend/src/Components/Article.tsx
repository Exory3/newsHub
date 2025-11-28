import type { ArticleDetails } from "../Pages/NewsPageLoader";

function Article({ image, title, article }: ArticleDetails) {
  console.log(image);
  return (
    <article className="flex flex-col gap-4 bg-amber-100 p-4 text-zinc-900 md:flex-row">
      <div className="flex-1">
        <h2 className="text-3xl wrap-break-word">{title}</h2>
        <p className="whitespace-pre-wrap">{article}</p>
      </div>

      <div className="flex w-full justify-center md:w-1/2">
        <img
          src={image}
          className="max-h-[80vh] max-w-full rounded object-contain"
        />
      </div>
    </article>
  );
}

export default Article;
