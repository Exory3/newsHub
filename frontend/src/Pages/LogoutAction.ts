import { redirect } from "react-router";
import { BASEURL } from "../utils/constants";

export default async function logoutAction() {
  await fetch(`${BASEURL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return redirect("/login");
}
