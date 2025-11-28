import useArticleForm from "./useArticleForm";
import type { Props } from "./types";
import FormControls from "./FormControls";
import InputFields from "./InputFields";
import { formStyle } from "./ArticleForm.styles";

function ArticleForm({ onSubmit, initialData, mode }: Props) {
  const { form, handleSubmit, isLoading, state, updateField } = useArticleForm(
    mode,
    onSubmit,
    initialData,
  );

  return (
    <form className={formStyle()} onSubmit={handleSubmit}>
      <InputFields form={form} updateField={updateField} />
      <FormControls isLoading={isLoading} mode={mode} state={state} />
    </form>
  );
}
export default ArticleForm;
