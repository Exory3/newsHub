import ArticleForm from "../Components/ArticleForm/ArticleForm";
import type { Form } from "../Components/ArticleForm/types";
import { BASEURL, defaultImageUrl } from "../utils/constants";

function NewArticlePage() {
  const handleSubmit = async (form: Form) => {
    return fetch(BASEURL + "/news", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        image: form.image.trim() ? form.image : defaultImageUrl,
      }),
    });
  };

  return <ArticleForm onSubmit={handleSubmit} mode="create" />;
}

export default NewArticlePage;
