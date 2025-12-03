import { Form, Link, Navigate, useSearchParams } from "react-router";
import FormInput from "./UI/FormInput";
import { formStyle } from "./LoginForm.styles";
import useAuth from "../store/authContext";

function LoginForm({ error }: { error: string | undefined }) {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const { auth } = useAuth();
  console.log(auth);
  if (auth.status !== "guest") return <Navigate to={"/"} />;
  return (
    <Form className={formStyle()} method="POST">
      <h2 className="text-center text-3xl">Welcome</h2>
      <FormInput id="email" label="Email" />
      <FormInput id="password" label="Password" />
      {mode === "signup" && (
        <>
          <FormInput id="confirm-password" label="Confirm password" />
          <p className="text-xl text-red-400">
            In progress, please don't use for now
          </p>
        </>
      )}
      <button className="mt-4 transform cursor-pointer rounded-sm border border-black bg-amber-600 py-1 hover:bg-amber-500">
        Get started
      </button>
      <div>
        <p className="inline-block text-sm">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <Link
          replace
          className="mx-4 inline-block transform rounded-sm border border-black bg-amber-700 px-2 py-1 hover:bg-amber-800"
          to={mode === "login" ? "/login?mode=signup" : "/login?mode=login"}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </Link>
      </div>
      {error && <p className="text-center text-red-300">{error}</p>}
    </Form>
  );
}

export default LoginForm;
