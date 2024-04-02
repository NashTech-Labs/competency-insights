import { useMsal } from '@azure/msal-react';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const EmployeeContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const { accounts } = useMsal();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (accounts && accounts.length > 0) {
        const username = accounts[0].username;
        setEmail(username);
      }
    } catch (e) {
      console.error("Error while fetching username:", e);
      setError("Error fetching username");
    }
  }, [accounts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const accessToken = sessionStorage.getItem("token");
          const requestOptions = {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          };
          const url = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${encodeURIComponent(email)}`;
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setEmployees(data);
        } else {
          setError("Email address not available");
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return (
    <EmployeeContext.Provider value={{ employees, loading, error }}>
      {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to access the employee data
export const useDataProvider = () => useContext(EmployeeContext);
