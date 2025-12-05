import { redirect, type ActionFunctionArgs } from "react-router";
import { deleteArticle } from "../utils/api";

const deleteArticleAction = async ({ params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) throw new Error("No id set in URL for this delete request");

  console.log(id);
  const res = await deleteArticle(id);

  if (!res.ok) {
    return { error: { message: "Couldn't delete that article" } };
  }
  return redirect("/news");
};

export default deleteArticleAction;
