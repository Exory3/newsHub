import { useNavigate } from "react-router";
import {
  actionButtons,
  formActions,
  formGrid,
  formGridItem,
  formInput,
  formStyle,
  textAreaContainer,
} from "./ArticleForm.styles";
import { useEffect, useState, type FormEvent } from "react";
import { BASEURL } from "../utils/constants";
import { isError } from "../utils/typeCheck";
import { articleInfo } from "./ArticlePreview.styles";

type ApiStatus = "idle" | "loading" | "success" | "error";
type Status = { status: ApiStatus; errors?: string[] };
type Form = { title: string; image: string; article: string; tags: string };
const defaultImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png?20081021155534";

const saveDraft = (draft: Form) => {
  localStorage.setItem("form", JSON.stringify(draft));
};

const initialFormState = {
  article: "",
  image: "",
  tags: "",
  title: "",
};

function ArticleForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(initialFormState);

  const [state, setState] = useState<Status>({
    status: "idle",
  });

  useEffect(() => {
    setTimeout(() => saveDraft(form), 200);
  }, [form]);

  useEffect(() => {
    const storage = localStorage.getItem("form");
    if (storage) {
      try {
        const form = JSON.parse(storage) as Partial<Form>;
        setForm({
          title: form.title ?? "",
          article: form.article ?? "",
          image: form.image ?? "",
          tags: form.tags ?? "",
        });
      } catch {
        localStorage.removeItem("form");
      }
    }
  }, []);

  const updateField = (field: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setState({ status: "idle" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [];
    if (form.article.trim().length < 30)
      errors.push(" Please, enter some sort of valid article");
    if (form.title.trim().length < 8) errors.push(" Your title is too short");
    if (errors.length > 0) {
      setState({ status: "error", errors });
      return;
    }
    setState({ status: "loading" });

    try {
      const res = await fetch(BASEURL + "/news", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image: form.image.trim() ? form.image : defaultImageUrl,
          tags: form.tags.trim()
            ? form.tags.split(",").map((tag) => tag.trim())
            : [],
        }),
      });
      if (!res.ok) {
        throw new Error("Error sending request to  server");
      }

      setForm(initialFormState);
      localStorage.removeItem("form");
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        errors: [isError(err) ? err.message : "Unknown error"],
      });
    }
  };
  const isLoading = state.status === "loading";
  return (
    <form className={formStyle()} onSubmit={handleSubmit}>
      <div className={formGrid()}>
        <p className={formGridItem()}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className={formInput()}
            value={form.title}
            onChange={(e) => {
              updateField("title", e.target.value);
            }}
          />
        </p>
        <p className={formGridItem()}>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="Please, select few, separted by coma"
            className={formInput()}
            value={form.tags}
            onChange={(e) => {
              updateField("tags", e.target.value);
            }}
          />
        </p>
      </div>
      <p className={formGridItem()}>
        <label htmlFor="image">Image url</label>
        <input
          id="image"
          name="image"
          type="url"
          className={formInput()}
          value={form.image}
          onChange={(e) => {
            updateField("image", e.target.value);
          }}
        />
      </p>
      <div className={textAreaContainer()}>
        <label htmlFor="article">Article</label>
        <textarea
          className={formInput()}
          id="article"
          name="article"
          value={form.article}
          onChange={(e) => {
            updateField("article", e.target.value);
          }}
        />
      </div>
      <div className={articleInfo()}>
        <div>
          {state.errors && (
            <ul>
              {state.errors.map((err) => (
                <li key={err} className="text-red-300">
                  {err}
                </li>
              ))}
            </ul>
          )}
          {state.status === "success" && (
            <p className="mx-8 text-green-300">Article successfully created</p>
          )}
        </div>
        <div className={formActions()}>
          <button
            type="button"
            className={actionButtons()}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button className={actionButtons()} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
export default ArticleForm;
