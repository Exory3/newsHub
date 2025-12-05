import { useActionData } from "react-router";
import LoginForm from "../Components/LoginForm/LoginForm";
import type loginAction from "../Components/LoginForm/LoginFormAction";

function LoginPage() {
  const data = useActionData<typeof loginAction>();

  return (
    <>
      <LoginForm error={data?.message} />
    </>
  );
}

export default LoginPage;
