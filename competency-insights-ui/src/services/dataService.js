import React, { createContext, useContext, useState, useEffect } from 'react';
import { TeamPage } from '../pages';
// Create a context
const EmployeeContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {

     
      try {
        // Retrieve the access token from session storage
        const accessToken = sessionStorage.getItem("token");
        const email=sessionStorage.getItem("email");
        // Include the bearer token in the request headers
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        const url = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${encodeURIComponent(email)}`;

        const response = await fetch(url,requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
        setLoading(false); // Set loading state to false when data is fetched
        console.log('Incoming data:',); // Log the incoming data
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <EmployeeContext.Provider value={employees}>
      {loading ? (
        <div>Loading...</div>
      ) : (
    children
      )}
    </EmployeeContext.Provider>
  );
};

// Custom hook to access the employee data
export const useDataProvider = () => useContext(EmployeeContext);