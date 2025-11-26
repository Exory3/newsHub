import { useEffect, useState } from "react";

export default function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setStatus("loading");

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }
        const json = (await res.json()) as T;
        setData(json);
        setStatus("idle");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        setStatus("error");

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      }
    };
    load();

    return () => controller.abort();
  }, [url]);
  return { data, status, error };
}
