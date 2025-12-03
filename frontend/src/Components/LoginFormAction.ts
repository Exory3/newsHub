import { type ActionFunctionArgs } from "react-router";
import { BASEURL } from "../utils/constants";
import { isError } from "../utils/typeCheck";
import type { AuthState } from "../store/authContext";

const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password)
    return { message: "Please enter valid email and password" };
  try {
    const res = await fetch(BASEURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      body: JSON.stringify({ email: "admin@site.com", password: "admin123" }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error loging in ");
    }
    const data = (await res.json()) as unknown as Awaited<AuthState>;
    return { message: "Success", data };
  } catch (err) {
    if (isError(err)) {
      return { message: err.message };
    } else return { message: "Unknown error" };
  }
};
export default loginAction;
