import { formGrid, textAreaContainer } from "./ArticleForm.styles";
import FormInput from "./FormInput";
import type { Form } from "./types";
interface Props {
  form: Form;
  updateField: <K extends keyof Form>(field: K, value: Form[K]) => void;
}
function InputFields({ form, updateField }: Props) {
  return (
    <div>
      <div className={formGrid()}>
        <FormInput
          label="Title"
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => {
            updateField("title", e.target.value);
          }}
        />
        <FormInput
          label="Tags"
          id="tags"
          type="text"
          value={form.tags.join(", ")}
          placeholder="Please, select few, separted by coma"
          onChange={(e) =>
            updateField(
              "tags",
              e.target.value.split(",").map((s) => s.trim()),
            )
          }
        />
      </div>
      <FormInput
        label="Image url"
        id="image"
        type="url"
        value={form.image}
        onChange={(e) => {
          updateField("image", e.target.value);
        }}
      />
      <FormInput
        wrapperClassName={textAreaContainer()}
        label="Article"
        id="article"
        as="textarea"
        value={form.article}
        onChange={(e) => {
          updateField("article", e.target.value);
        }}
      />
    </div>
  );
}

export default InputFields;
