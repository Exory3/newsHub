import { redirect } from "react-router";
import { logout } from "../utils/api";

export default async function logoutAction() {
  logout();

  return redirect("/auth");
}
