import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      await axios
        .get(url, { cancelToken: source.token })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('useFetch => canceled request');
          }
          return err.message;
        });
    };

    fetchData();
    return () => source.cancel();
  }, [url]);

  return { isLoading, data };
};

export default useFetch;
