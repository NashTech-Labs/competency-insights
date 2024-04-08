import React, { createContext, useContext, useState, useEffect } from 'react';
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
        // Retrieve the access token from session storage
        const email=sessionStorage.getItem("email");
        // Include the bearer token in the request headers
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        // Hardcoding the email 
        const url = `http://localhost:8081/cs/nasher/email/${email}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
        setLoading(false); // Set loading state to false when data is fetched
        console.log('Incoming data:',employees); // Log the incoming data
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