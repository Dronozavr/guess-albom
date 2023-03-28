import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

export const useFetch = <T>(url: string, initialValue: T, preFetch = false) => {
  const [result, setResult] = useState(initialValue);
  const [error, setError] = useState<Error | null >(null);
  const [loading, setLoading] = useState(true);

  const makeFetch = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, { withCredentials: true });
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
      makeFetch();
    }
  }, [url, makeFetch, preFetch]);
  console.log('return ', result);
  
  return { loading, result, error, makeFetch };
};
