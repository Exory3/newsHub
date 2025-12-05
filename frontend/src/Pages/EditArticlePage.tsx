import { useLocation, useNavigate, useParams } from "react-router";
import ArticleForm from "../Components/ArticleForm/ArticleForm";
import type { ArticleDetails } from "./NewsPageLoader";
import type { Form } from "../Components/ArticleForm/types";
import { editArticle } from "../utils/api";

function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state as ArticleDetails;
  if (!state) navigate("..", { replace: true });
  if (!id) throw new Error("");

  const handleSubmit = async (form: Form) => {
    return editArticle(form, id);
  };

  return (
    <ArticleForm onSubmit={handleSubmit} mode="edit" initialData={state} />
  );
}

export default EditArticlePage;
