import React, { useEffect, useState } from 'react';
import {ReportingMembers} from './components/ReportingMembers';
import {Reports} from './components/Reports';
import {PermanentDrawerLeft} from "../../components/Layout/NavBar"
import { useDataProvider } from '../../services/dataService';
import { SkeletonProfile } from '../../components/Layout/SkeletonProfile';
import UseDataFetching from '../../services/useDataFetching';

export const TeamPage = () => {
  const {user} = useDataProvider()
 
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const fetchMemberData = async () => {
      try {

        if (!user.reportingMembers || user.reportingMembers.length === 0) {
          setLoading(false);
          return; 
        }
  
        const memberPromises = user.reportingMembers.map(async (reportingMember) => {
          const memberUrl=`${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${encodeURIComponent(reportingMember)}`;
          const response =  await UseDataFetching(memberUrl);
          if (response==null || !response) {
            throw new Error(`Failed to fetch data for ${reportingMember}`);
          }
          setLoading(false);
          return response;
        });
        const memberData = await Promise.all(memberPromises);
        setMemberData(memberData);
      } catch (error) {
        setLoading(false)
        setErr(error)
        console.error('Error fetching member data:', error);
      }
    };
  
    fetchMemberData();
  }, [user.reportingMembers]);
  
 

  return(
   <div>
   <PermanentDrawerLeft name ={user.name} />
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
      {err &&  <div className="flex justify-center items-center h-screen">
      <img
          src="/no_data_found.jpeg"
          className="mx-auto"
          alt="No data found"
      />
  </div>}
   </div>
  )
 }