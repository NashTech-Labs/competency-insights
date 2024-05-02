import React, { useEffect, useState } from 'react';
import {ReportingMembers} from './components/ReportingMembers';
import {Reports} from './components/Reports';
import {PermanentDrawerLeft} from "../../components/Layout/NavBar"
import { useDataProvider } from '../../services/dataService';
import { SkeletonProfile } from '../../components/Layout/SkeletonProfile';

export const TeamPage = () => {
  const {user} = useDataProvider()
 
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(false);
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const memberPromises = user.reportingMembers.map(async (reportingMember) => {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${reportingMember}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${reportingMember}`);
          }
          const data = await response.json();
          setLoading(false);
          return data;
        });
        const memberData = await Promise.all(memberPromises);
        setMemberData(memberData);
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };
  
    fetchMemberData();
  }, [user.reportingMembers]);
  
 

  return(
   <div>
   <PermanentDrawerLeft  />
     <div>
       <Reports/>
     </div>
     {loading ? <SkeletonProfile/> :
     <div className="flex justify-center ml-60 px-20">
       {memberData.map((employee, index) => (
         <ReportingMembers key={index} employee={employee}/>
       ))}
     </div>
      }
   </div>
  )
 }