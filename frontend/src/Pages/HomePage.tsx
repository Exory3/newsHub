import { useRouteLoaderData } from "react-router";
import type RootLoader from "../Layout/RootLoader";

function HomePage() {
  const rootData = useRouteLoaderData<typeof RootLoader>("root");
  const auth = rootData?.auth;

  return (
    <h1 className="w-full text-center text-6xl">
      Welcome,
      {auth && auth.status === "authed"
        ? auth.user.email.split("@")[0]
        : "guest"}
    </h1>
  );
}

export default HomePage;
