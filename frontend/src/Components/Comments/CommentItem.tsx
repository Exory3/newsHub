import type { Comment } from "./Comments";

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className="flex gap-4">
      <span>{comment.authorName.split("@")[0] ?? comment.authorName}</span>
      <p>{comment.content}</p>
    </li>
  );
}

export default CommentItem;
