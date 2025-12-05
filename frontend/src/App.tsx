import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout/Layout";
import ErrorPage from "./Pages/ErrorPage";
import NewsPage from "./Pages/NewsPage";
import { newsLoader } from "./Pages/NewsPageLoader";
import NewArticlePage from "./Pages/NewArticlePage";
import ArticlePage from "./Pages/ArticlePage";
import EditArticlePage from "./Pages/EditArticlePage";
import LoginPage from "./Pages/LoginPage";
import authAction from "./Components/LoginForm/LoginFormAction";
import RootLoader from "./Layout/RootLoader";
import RequireAuth from "./Layout/RequireAuth";
import HomePage from "./Pages/HomePage";
import logoutAction from "./Pages/LogoutAction";
import deleteArticleAction from "./Pages/deleteArticle";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: RootLoader,
      children: [
        { index: true, element: <HomePage /> },
        { path: "news", element: <NewsPage />, loader: newsLoader },
        {
          path: "news/:id",
          element: <ArticlePage />,
          action: deleteArticleAction,
        },
        { path: "auth", element: <LoginPage />, action: authAction },
        { path: "logout", action: logoutAction },
        {
          element: <RequireAuth role="admin" />,
          children: [{ path: "news/:id/edit", element: <EditArticlePage /> }],
        },
        {
          element: <RequireAuth />,
          children: [{ path: "create", element: <NewArticlePage /> }],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
