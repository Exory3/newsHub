import { useParams } from "react-router";
import NewComment from "./NewComment";
import { BASEURL } from "../../utils/constants";
import { useEffect, useState } from "react";
import useAuth from "../../store/authContext";
import CommentsList from "./CommentsList";

export interface Comment {
  authorName: string;
  content: string;
  createdAt: number;
  id: number;
  newsId: number;
}

function Comments() {
  const { id } = useParams();
  const newsId = Number(id);
  if (Number.isNaN(newsId))
    throw new Error("Your url contains an arrow, article id must be a number");

  const { auth } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setStatus("loading");
        const res = await fetch(BASEURL + `/news/${newsId}/comments`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }
        const data = (await res.json()) as { items: Comment[] };
        console.log(data);
        setComments(data.items);
        console.log("here");
        setStatus("idle");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };
    load();
    return () => controller.abort();
  }, [newsId]);

  const addComment = async (comment: string) => {
    if (auth.status === "guest")
      throw new Error("only autherized users can leave a comment");
    const authorName = auth.user.email.split("@")[0];
    const optimisticComment: Comment = {
      authorName,
      content: comment,
      createdAt: Date.now(),
      id: Math.floor(Math.random() * Date.now()),
      newsId,
    };
    setComments((prev) => [optimisticComment, ...prev]);

    try {
      const res = await fetch(BASEURL + `/news/${newsId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, author: authorName }),
      });
      if (!res.ok) throw new Error("failed to add comment");
      const saved = await res.json();

      setComments((prev) =>
        prev.map((c) => (c.id === optimisticComment.id ? saved : c)),
      );
    } catch {
      setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
    }
  };

  return (
    <>
      <NewComment onSubmit={addComment} />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" && error ? (
        <div>{error ?? "Failed to load comment list"}</div>
      ) : (
        <CommentsList comments={comments} />
      )}
    </>
  );
}

export default Comments;
