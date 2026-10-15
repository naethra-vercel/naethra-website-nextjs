import { useEffect, useState } from "react";

type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

export function useAsyncResource<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    loader()
      .then((data) => {
        if (!cancelled) setState({ status: "success", data, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            data: null,
            error: error instanceof Error ? error : new Error("Failed to load"),
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);

  return state;
}
