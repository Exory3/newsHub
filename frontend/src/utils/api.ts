import type { Form } from "../Components/ArticleForm/types";
import { BASEURL, defaultImageUrl } from "./constants";
interface authParams {
  email: string;
  password: string;
  confirmPassword: string;
}

export const login = async ({
  email,
  password,
}: Omit<authParams, "confirmPassword">) => {
  const res = await fetch(BASEURL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Error loging in");
  }
  return res;
};

export const logout = async () => {
  await fetch(`${BASEURL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const addArticle = async (form: Form) => {
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

export const editArticle = async (form: Form, id: string) => {
  return fetch(`${BASEURL}/news/${id}`, {
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
export const deleteArticle = async (id: string) => {
  return fetch(BASEURL + "/news/" + id, {
    credentials: "include",
    method: "DELETE",
  });
};

type signupResponse =
  | { error: { message: string } }
  | { data: { id: number; role: "admin" | "user"; email: string } };

export const signup = async (params: authParams) => {
  const res = await fetch(BASEURL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = (await res.json()) as signupResponse;

  return { ok: res.ok, data };
};
