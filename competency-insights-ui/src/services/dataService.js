import React, { createContext, useContext, useState, useEffect } from 'react';
// Create a context
const EmployeeContext = createContext();

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (emailAddress) => {
    try {
      // Retrieve the access token from session storage
      const accessToken = sessionStorage.getItem("token");
      const email=sessionStorage.getItem("email");
    
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      const url = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${email}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmployees(data);
      setLoading(false); 
      console.log('data loaded agia'); // Log the incoming data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EmployeeContext.Provider value={{employees,fetchData}}>
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