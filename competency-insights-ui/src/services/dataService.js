import React, { createContext, useContext, useState, useEffect } from 'react';
import UseDataFetching from './useDataFetching';
import { SkeletonProfile } from '../components/Layout/SkeletonProfile';

// Create a context
const EmployeeContext = createContext();

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [okrData, setOkrData] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Separate function to fetch employee data
  
  const fetchEmployeeData = async (email) => {
    try {
      // Retrieve the access token from session storage
      const accessToken = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      const profileUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${email}`;
      const data = await UseDataFetching(profileUrl)
      console.log("-----",data)
      setEmployees(data);
  
    } catch (error) {
      console.error('There was a problem fetching employee data:', error);
      throw error;
    }
  };
  
  // Separate function to fetch OKR data
  const fetchOKRData = async (email) => {
    try {
      const okrUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}/${email}`;
      const okrData= await UseDataFetching(okrUrl)
      console.log("-----",okrData)
      setOkrData(okrData);
    } catch (error) {
      console.error('There was a problem fetching OKR data:', error);
      throw error;

     
    }
    
  };
  
  // Separate function to fetch studio data
  const fetchStudioData = async () => {
    try {
      const studioDataUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}`;
      const studioData = await UseDataFetching(studioDataUrl)
      console.log("-----*****",studioData)
      setStudioData(studioData);
    } catch (error) {
      console.error('There was a problem fetching studio data:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = sessionStorage.getItem("email");
  
        await fetchEmployeeData(email);
        await fetchOKRData(email);
  
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <EmployeeContext.Provider value={{ employees, okrData, studioData, fetchStudioData ,fetchOKRData }}>
      {loading ? <SkeletonProfile/> : children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to access the employee data
export const useDataProvider = () => useContext(EmployeeContext);
