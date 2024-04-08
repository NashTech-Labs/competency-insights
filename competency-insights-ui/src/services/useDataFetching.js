import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const useDataFetching = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { instance } = useMsal();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the access token from session storage
        const accessToken = sessionStorage.getItem("token");
        // Include the bearer token in the request headers
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };

        const dataResponse = await fetch(url, requestOptions);
        if (!dataResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await dataResponse.json();
        setData(result);
      } catch (error) {
        setError(error); // Set error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {

    };
  }, [url]);

  return { data, isLoading, error };
};

export default useDataFetching;
