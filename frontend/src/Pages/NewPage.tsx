import { useLoaderData } from "react-router";
import type { newLoader } from "./newPageLoader";

function NewPage() {
  const { data } = useLoaderData<typeof newLoader>();
  const { items, total } = data;
  console.log(items);
  return <div>{total}</div>;
}

export default NewPage;
