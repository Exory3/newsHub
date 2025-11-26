import { type LoaderFunctionArgs } from "react-router-dom";
import { BASEURL } from "../utils/constants";
export interface ArticleDetails {
  article: string;
  createdAt: number;
  id: number;
  tags: string[];
  title: string;
  views: number;
  image: string;
}
interface loaderData {
  data: { items: ArticleDetails[]; limit: number; page: number; total: number };
}

export const newsLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<loaderData> => {
  const url = new URL(request.url);
  const tag = url.searchParams.get("tag");
  const page = url.searchParams.get("page") ?? "1";

  const res = await fetch(`${BASEURL}/news?tag=${tag ?? ""}&page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }
  const data: loaderData = await res.json();
  return data;
};
