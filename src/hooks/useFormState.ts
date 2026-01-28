import { useCallback, useState } from "react";

interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const useFormState = () => {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setSuccess = useCallback((success: boolean) => {
    setState((prev) => ({ ...prev, success }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    isLoading: state.isLoading,
    error: state.error,
    success: state.success,
    setLoading,
    setError,
    setSuccess,
    reset,
  };
};
