import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/HomePage";
import Layout from "./Layout/Layout";
import ErrorPage from "./Pages/ErrorPage";
import NewPage from "./Pages/NewPage";
import { newLoader } from "./Pages/newPageLoader";

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
        { path: "new", element: <NewPage />, loader: newLoader },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
