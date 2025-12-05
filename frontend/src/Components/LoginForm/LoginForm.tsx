import { Form, Link, Navigate, useSearchParams } from "react-router";
import FormInput from "../UI/FormInput";
import {
  loginButton,
  loginError,
  loginStyle,
  loginTip,
  loginTitle,
} from "./LoginForm.styles";
import useAuth from "../../store/authContext";

function LoginForm({ error }: { error: string | undefined }) {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const { auth } = useAuth();

  if (auth.status !== "guest") return <Navigate to={"/"} />;

  return (
    <Form className={loginStyle()} method="POST">
      <h2 className={loginTitle()}>Welcome</h2>
      <FormInput id="email" label="Email" />
      <FormInput id="password" label="Password" />
      {mode === "signup" && (
        <>
          <FormInput id="confirm-password" label="Confirm password" />
        </>
      )}
      {mode === "login" && (
        <>
          <p className={loginError()}>try admin@site.com</p>
          <p className={loginError()}>admin123</p>
        </>
      )}
      <button className={loginButton()}>Get started</button>
      <div>
        <p className={loginTip()}>
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <Link
          replace
          className={loginButton()}
          to={mode === "login" ? "/auth?mode=signup" : "/auth?mode=login"}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </Link>
      </div>
      {error && <p className={loginError()}>{error}</p>}
    </Form>
  );
}

export default LoginForm;
