import { useState } from "react";

interface Props {
  onSubmit: (comment: string) => void;
}

function NewCommentForm({ onSubmit }: Props) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    onSubmit(comment);
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col rounded-xl bg-blue-300 p-4 text-xl text-black"
      onSubmit={handleSubmit}
    >
      <textarea
        rows={3}
        placeholder="Your comment"
        className="p-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={loading}
      />
      <button
        className="mt-4 cursor-pointer self-start rounded-sm bg-amber-200 p-2 px-8 text-start hover:bg-slate-800 hover:text-slate-200"
        disabled={loading}
      >
        {loading ? "submitting.." : "Post"}
      </button>
    </form>
  );
}

export default NewCommentForm;
