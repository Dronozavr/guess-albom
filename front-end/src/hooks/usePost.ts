import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

export const usePost = <T>(url: string, initialValue: T, preFetch = false) => {
  const [result, setResult] = useState(initialValue);
  const [error, setError] = useState<Error | null >(null);
  const [loading, setLoading] = useState(true);

  const makePost = useCallback(async (body?: any) => {
    try {
      const { data } = await axios.post(`${baseUrl}${url}`, body, { withCredentials: true });
      console.log(url, ' - ', data);
      
      setResult(data as T);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (preFetch) {
        makePost();
    }
  }, [url, makePost, preFetch]);
  
  return { loading, result, error, makePost };
};
