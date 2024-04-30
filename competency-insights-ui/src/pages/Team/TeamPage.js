import React, { useEffect, useState } from 'react';
import {ReportingMembers} from './components/ReportingMembers';
import {Reports} from './components/Reports';
import {PermanentDrawerLeft} from "../../components/Layout/NavBar"
import { useDataProvider } from '../../services/dataService';
import { SkeletonProfile } from '../../components/Layout/SkeletonProfile';

export const TeamPage = () => {
  const {employees,fetchData} = useDataProvider()
 
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      const memberPromises = employees.reportingMembers.map(async (reportingMember) => {
        console.log('Reporting members data -->',reportingMember)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${reportingMember}`);
        const data = await response.json();
        setLoading(false)
        return data;
      });
      const memberData = await Promise.all(memberPromises);
      setMemberData(memberData);
      console.log(memberData)
    };
 
    fetchMemberData();
  }, [employees.reportingMembers]);
 
  //retriving eamil from the context provider
  const email =employees.email
  console.log('fetching email to team page',email)
  return(
   <div>
   <PermanentDrawerLeft  />
     <div>
       <Reports/>
     </div>
     {loading ? <SkeletonProfile/>:
     <div className="flex justify-center ml-60 px-20">
       {memberData.map((employee, index) => (
         <ReportingMembers key={index} employee={employee}/>
       ))}
     </div>
      }
   </div>
  )
 }