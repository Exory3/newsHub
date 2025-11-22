import { useState, type FormEvent } from "react";
import { NLError, NLForm, NLInfo, NLInput } from "./layout.styles";

function NewsLetter() {
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    const res = await fetch("http://localhost:3000/subscribe", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("error");
      const data: { message?: string } = await res.json();
      const error = data.message ?? "Something went wrong";
      setError(error);
    }
  };
  return (
    <div>
      <form className={NLForm()} onSubmit={handleSubmit}>
        <input
          className={NLInput()}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="mx-2 flex-none"
          type="submit"
          disabled={status === "loading"}
        >
          subscribe
        </button>
      </form>
      {status === "success" && (
        <p className={NLInfo()}>email successfully registered</p>
      )}
      {status === "error" && <p className={NLError()}>{error}</p>}
    </div>
  );
}

export default NewsLetter;
