import { useLocation, useNavigate, useParams } from "react-router";
import ArticleForm, { type Form } from "../Components/ArticleForm/ArticleForm";
import { BASEURL, defaultImageUrl } from "../utils/constants";
import type { ArticleDetails } from "./NewsPageLoader";

function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state as ArticleDetails;
  if (!state) navigate("..", { replace: true });

  const handleSubmit = async (form: Form) => {
    return fetch(BASEURL + `/news/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        image: form.image.trim() ? form.image : defaultImageUrl,
      }),
    });
  };

  return (
    <ArticleForm onSubmit={handleSubmit} mode="edit" initialData={state} />
  );
}

export default EditArticlePage;
