import { Link } from "react-router";
import useAuth from "../../store/authContext";
import NewCommentForm from "./NewCommentForm";

function NewComment(props: { onSubmit: (comment: string) => void }) {
  const { auth } = useAuth();

  return (
    <div className="mt-10">
      {auth.status === "guest" && (
        <p>
          please <Link to="/auth">login</Link> to be able to create comment
        </p>
      )}
      {auth.status === "authed" && <NewCommentForm {...props} />}
    </div>
  );
}

export default NewComment;
