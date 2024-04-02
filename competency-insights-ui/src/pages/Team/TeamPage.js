import React from 'react';
import {ReportingMembers} from './components/ReportingMembers';
import {Reports} from './components/Reports';
import {PermanentDrawerLeft} from "../../components/Layout/NavBar"
import { useDataProvider } from '../../services/dataService';

export const TeamPage = () => {
  const employees = useDataProvider()
  const data =employees.reportingMembers

  return(
   
   <div>
   <PermanentDrawerLeft  />
     <div>
       <Reports/>
     </div>
     <div className="flex justify-center ml-60 px-20">
       {data.map((employee, index) => (
         <ReportingMembers key={index} employee={employee} />
       ))}
     </div>
   </div>
  )
 }