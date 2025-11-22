import { useEffect } from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorMessage = "Unknown error";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error("Unknown error in ErrorPage", error);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("..", { replace: true });
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorPage;
