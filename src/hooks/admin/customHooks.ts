import axios from 'axios'
import { useState } from 'react';


type UseFormHandlerProps<T> = {
  apiEndpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export function useFormHandler<T = any>({
  apiEndpoint,
  onSuccess,
  onError,
}: UseFormHandlerProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleApiSubmit = async (values: T) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await axios.post(apiEndpoint, values);
      setSuccess(true);
      onSuccess?.(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleApiSubmit,
    loading,
    error,
    success,
  };
}
