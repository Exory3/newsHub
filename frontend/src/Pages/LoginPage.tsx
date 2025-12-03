import { useActionData } from "react-router";
import LoginForm from "../Components/LoginForm";
import useAuth from "../store/authContext";
import type loginAction from "../Components/LoginFormAction";
import { useEffect } from "react";

function LoginPage() {
  const { login } = useAuth();

  const data = useActionData<typeof loginAction>();

  useEffect(() => {
    if (data && data?.message === "Success" && data?.data) {
      login(data.data);
    }
  }, [data, login]);

  return (
    <>
      <LoginForm error={data?.message} />
    </>
  );
}

export default LoginPage;
