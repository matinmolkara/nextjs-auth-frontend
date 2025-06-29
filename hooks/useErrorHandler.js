"use client";
import { useState, useCallback } from "react";
import { handleApiError } from "@/utils/errorHandler";
import { useError } from "@/context/ErrorContext";

export function useErrorHandler() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addError } = useError();

  const handleAsync = useCallback(
    async (asyncFunction, showToast = false) => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFunction();
        return result;
      } catch (err) {
        const processedError = handleApiError(err);
        setError(processedError);

        if (showToast) {
          addError(processedError);
        }

        throw processedError;
      } finally {
        setLoading(false);
      }
    },
    [addError]
  );

  const clearError = useCallback(() => setError(null), []);

  return { error, loading, handleAsync, clearError };
}
