import { formGrid, textAreaContainer } from "./ArticleForm.styles";
import FormInput from "../UI/FormInput";
import type { Form } from "./types";
interface Props {
  form: Form;
  updateField: <K extends keyof Form>(field: K, value: Form[K]) => void;
}
function InputFields({ form, updateField }: Props) {
  return (
    <div className="space-y-4">
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
          placeholder="Please, select few, separated by comma"
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
      <div className={textAreaContainer()}>
        <FormInput
          wrapperClassName={textAreaContainer()}
          label="Article"
          id="article"
          as="textarea"
          value={form.article}
          rows={10}
          onChange={(e) => {
            updateField("article", e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default InputFields;
