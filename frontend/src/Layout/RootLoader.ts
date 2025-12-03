import type { AuthState } from "../store/authContext";
import { BASEURL } from "../utils/constants";

const RootLoader = async () => {
  try {
    const res = await fetch(BASEURL + "/me", { credentials: "include" });

    if (!res.ok) throw new Error("Guest");

    const data = (await res.json()) as
      | Exclude<AuthState, { status: "guest" }>
      | { user: null };
    if (data.user === null) {
      return { auth: { status: "guest" } };
    }
    console.log(data);

    return { auth: data };
  } catch {
    console.log("error logging in");
    return { auth: { status: "guest" } };
  }
};

export default RootLoader;
