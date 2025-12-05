import ArticleForm from "../Components/ArticleForm/ArticleForm";
import type { Form } from "../Components/ArticleForm/types";
import { addArticle } from "../utils/api";

function NewArticlePage() {
  const handleSubmit = async (form: Form) => {
    return addArticle(form);
  };

  return <ArticleForm onSubmit={handleSubmit} mode="create" />;
}

export default NewArticlePage;
