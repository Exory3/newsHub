import CommentItem from "./CommentItem";
import type { Comment } from "./Comments";

function CommentsList({ comments }: { comments: Comment[] }) {
  return (
    <ul>
      {comments.length > 0 &&
        comments.map((c) => <CommentItem comment={c} key={c.id} />)}
    </ul>
  );
}

export default CommentsList;
