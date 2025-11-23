import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/HomePage";
import Layout from "./Layout/Layout";
import ErrorPage from "./Pages/ErrorPage";
import RecentPage from "./Pages/RecentPage";
import { newLoader } from "./Pages/RecentPageLoader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "new", element: <RecentPage />, loader: newLoader },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
