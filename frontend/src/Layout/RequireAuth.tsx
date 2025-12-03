import { Navigate, Outlet } from "react-router";
import useAuth from "../store/authContext";

export function RequireAuth({ role }: { role?: "user" | "admin" }) {
  const { auth } = useAuth();

  if (auth.status === "guest") return <Navigate to="/login" replace />;
  if (role && auth.role !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default RequireAuth;
