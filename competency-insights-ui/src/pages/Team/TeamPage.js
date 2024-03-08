import React from 'react';
import {ReportingMembers} from './components/ReportingMembers';
import employeesData from '../../data/employees.json';
import {Reports} from './components/Reports';
import { Footer, Header, Navbar } from "../../components";

export const TeamPage = () => {
  return (
    <div>
    <Navbar /> <Header />
      <div>
        <Reports/>
      </div>
      <div className="flex justify-center">
        {employeesData.map((employee, index) => (
          <ReportingMembers key={index} employee={employee} />
        ))}
      </div>
      <Footer />
    </div>
  );
}