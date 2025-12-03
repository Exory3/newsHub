import useAuth from "../store/authContext";

export default function useRole() {
  const { auth } = useAuth();
  return auth.status === "authed" ? auth.role : null;
}
