import React from 'react';
import {ReportingMembers} from './components/ReportingMembers';
import employeesData from '../../data/employees.json';
import {Reports} from './components/Reports';
import {PermanentDrawerLeft} from "../../components/Layout/Navbar/TestNavBar"

export const TeamPage = ({emailAddress, name}) => {
  return (
    <div>
    <PermanentDrawerLeft name = {name} />
      <div>
        <Reports/>
      </div>
      <div className="flex justify-center ml-60 px-20">
        {employeesData.map((employee, index) => (
          <ReportingMembers key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
}