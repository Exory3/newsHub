import { redirect, type ActionFunctionArgs } from "react-router";

import { isError } from "../../utils/typeCheck";
import { login, signup } from "../../utils/api";

const authAction = async ({ request }: ActionFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const mode = searchParams.get("mode");

  if (typeof email !== "string" || typeof password !== "string")
    return { message: "Please enter valid email and password" };

  if (mode !== "signup" && mode !== "login")
    return { message: "mode must be signup or login" };

  if (mode === "signup" && typeof confirmPassword !== "string") {
    return { message: "Please enter a valid confirm password" };
  }

  if (mode === "signup") {
    if (password !== confirmPassword)
      return { message: "passwords must match" };

    try {
      const { data, ok } = await signup({ email, password, confirmPassword });
      if (!ok && "error" in data)
        return { message: data.error.message ?? "Unknown error creating user" };
      return redirect("/");
    } catch (err) {
      return {
        message: isError(err) ? err.message : "Unknown error creating user",
      };
    }
  }
  if (mode === "login")
    try {
      await login({ email, password });
      return redirect("/");
    } catch (err) {
      return { message: isError(err) ? err.message : "Unknown error" };
    }
};
export default authAction;
