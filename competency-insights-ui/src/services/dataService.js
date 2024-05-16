import React, { createContext, useContext, useState, useEffect } from 'react';
import UseDataFetching from './useDataFetching';
import { SkeletonProfile } from '../components/Layout/SkeletonProfile';
import { useMsal } from '@azure/msal-react';

// Create a context
const EmployeeContext = createContext();
export const DataProvider = ({ children, email }) => {
  const [user, setUser] = useState([]);
  const [okr, setOKR] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accounts } = useMsal();
  // Separate function to fetch employee data
  const fetchEmployeeData = async (email) => {
    try {
      const profileUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${encodeURIComponent(email)}`;
      const data = await UseDataFetching(profileUrl)
      setUser(data);
    } catch (error) {
      setLoading(false)
      console.error('There was a problem fetching employee data:', error);
      throw error;
    }
  };
  
  // Separate function to fetch OKR data
  const fetchOKRData = async () => {
    try {
      const okrUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_BY_EMAIL}/${encodeURIComponent(email)}`;
      const okrdata= await UseDataFetching(okrUrl);
      if (!okrdata) {
        throw new Error(`Failed to fetch okrdata`);
      }
      setOKR(okrdata);
    } catch (error) {
      setLoading(false);
      console.error('There was a problem fetching OKR data:', error);
      
    }
    
  };
  
  // Separate function to fetch studio data
  const fetchStudioData = async () => {
    try {
      const studioDataUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}`;
      const studioData = await UseDataFetching(studioDataUrl)
      setStudioData(studioData);
    } catch (error) {
      console.error('There was a problem fetching studio data:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEmployeeData();
        await fetchOKRData();
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <EmployeeContext.Provider value={{ user, okr, studioData, fetchStudioData ,fetchOKRData, fetchEmployeeData }}>
      {loading ? <SkeletonProfile/> : children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to access the employee data
export const useDataProvider = () => useContext(EmployeeContext);
