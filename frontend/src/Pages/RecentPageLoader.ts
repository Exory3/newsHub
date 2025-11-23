export interface LoaderResponse {
  article: string;
  createdAt: number;
  id: number;
  tags: string[];
  title: string;
  views: number;
}
export interface loaderData {
  data: { items: LoaderResponse[]; limit: number; page: number; total: number };
}

export const newLoader = async ({
  params,
}: Route.Clien): Promise<loaderData> => {
  const res = await fetch("http://localhost:3000/news");
  const data: loaderData = await res.json();
  return data;
};
