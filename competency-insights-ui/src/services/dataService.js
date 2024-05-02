import React, { createContext, useContext, useState, useEffect } from 'react';
import UseDataFetching from './useDataFetching';
import { SkeletonProfile } from '../components/Layout/SkeletonProfile';
import { useMsal } from '@azure/msal-react';

// Create a context
const EmployeeContext = createContext();
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [okr, setOKR] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const { accounts } = useMsal();
  const getEmailFromAzureDirectory =async() =>{
    try {
      // if (accounts && accounts.length > 0) {
      //   const username = accounts[0].username;
         const username="Ankit.Mogha@nashtechglobal.com"
        //  setEmail("Ankit.Mogha@nashtechglobal.com");
        //  console.log("-----1",email)
         return username;
      // }
      
    } catch (error) {
      console.error("Error while fetching username:", error);
    }
  }

  // Separate function to fetch employee data
  
  const fetchEmployeeData = async (email) => {
    try {
      const profileUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${email}`;
      const data = await UseDataFetching(profileUrl)
      setUser(data);
  
    } catch (error) {
      console.error('There was a problem fetching employee data:', error);
      throw error;
    }
  };
  
  // Separate function to fetch OKR data
  const fetchOKRData = async (email) => {
    try {
      const okrUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}/${email}`;
      const okrdata= await UseDataFetching(okrUrl)
      setOKR(okrdata);
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
      setStudioData(studioData);
    } catch (error) {
      console.error('There was a problem fetching studio data:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
       const email = await getEmailFromAzureDirectory();
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
    <EmployeeContext.Provider value={{ user, okr, studioData, fetchStudioData ,fetchOKRData }}>
      {loading ? <SkeletonProfile/> : children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to access the employee data
export const useDataProvider = () => useContext(EmployeeContext);
