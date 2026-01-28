import { useCallback, useEffect, useRef, useState } from "react";

interface AsyncState<T> {
  status: "idle" | "pending" | "success" | "error";
  data: T | null;
  error: Error | null;
}

export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
) => {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const asyncFunctionRef = useRef(asyncFunction);

  useEffect(() => {
    asyncFunctionRef.current = asyncFunction;
  }, [asyncFunction]);

  const execute = useCallback(async () => {
    setState({ status: "pending", data: null, error: null });
    try {
      const response = await asyncFunctionRef.current();
      setState({ status: "success", data: response, error: null });
      return response;
    } catch (error) {
      setState({
        status: "error",
        data: null,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status: state.status,
    data: state.data,
    error: state.error,
    isLoading: state.status === "pending",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    isIdle: state.status === "idle",
  };
};
