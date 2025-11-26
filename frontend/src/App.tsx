import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Components/Sidebar";
import Layout from "./Layout/Layout";
import ErrorPage from "./Pages/ErrorPage";
import NewsPage from "./Pages/NewsPage";
import { newsLoader } from "./Pages/NewsPageLoader";
import NewArticlePage from "./Pages/NewArticlePage";
import ArticlePage from "./Pages/ArticlePage";
// import { homePageLoader } from "./Pages/HomePageLoader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "news", element: <NewsPage />, loader: newsLoader },
        { path: "news/:id", element: <ArticlePage /> },
        { path: "add", element: <NewArticlePage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
