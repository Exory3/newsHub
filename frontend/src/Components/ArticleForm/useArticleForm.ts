import { useEffect, useState, type FormEvent } from "react";
import type { Form, Status } from "./types";
import { isError } from "../../utils/typeCheck";
import useAuth from "../../store/authContext";
import { useNavigate } from "react-router";

const saveDraft = (draft: Form) => {
  localStorage.setItem("form", JSON.stringify(draft));
};

const initialFormState = {
  article: "",
  image: "",
  tags: [""],
  title: "",
};

const useArticleForm = (
  mode: "create" | "edit",
  onSubmit: (f: Form & { author: string }) => Promise<Response>,
  initialData?: Form,
) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(initialData ?? initialFormState);
  const [state, setState] = useState<Status>({ status: "idle" });
  const { auth } = useAuth();
  let author: string;

  if (auth.status === "guest") {
    navigate("/");
  } else {
    author = auth.user.email.split("@")[0];
  }

  const updateField = <K extends keyof Form>(field: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setState({ status: "idle" });
  };

  useEffect(() => {
    if (mode !== "create") return;
    const timer = setTimeout(() => saveDraft(form), 400);
    return () => clearTimeout(timer);
  }, [form, mode]);

  useEffect(() => {
    if (mode !== "create") return;
    const storage = localStorage.getItem("form");
    if (storage) {
      try {
        const form = JSON.parse(storage) as Partial<Form>;
        setForm({
          title: form.title ?? "",
          article: form.article ?? "",
          image: form.image ?? "",
          tags: form.tags ?? [""],
        });
      } catch {
        localStorage.removeItem("form");
      }
    }
  }, [mode]);

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
      const res = await onSubmit({ ...form, author });

      if (!res.ok) {
        throw new Error("Error sending request to  server");
      }

      setForm(initialFormState);
      if (mode === "create") localStorage.removeItem("form");
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        errors: [isError(err) ? err.message : "Unknown error"],
      });
    }
  };
  const isLoading = state.status === "loading";
  return { form, state, updateField, handleSubmit, isLoading };
};

export default useArticleForm;
