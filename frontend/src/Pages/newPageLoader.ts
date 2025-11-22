interface item {
  article: string;
  createdAt: string;
  id: number;
  tag: string | null;
  title: string;
  views: number;
}
export interface loaderData {
  data: { items: item[]; limit: number; page: number; total: number };
}

export const newLoader = async (): Promise<loaderData> => {
  const res = await fetch("http://localhost:3000/news");
  const data: loaderData = await res.json();
  return data;
};
