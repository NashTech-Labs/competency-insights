import React from 'react';
import ReportingMembers from './ReportingMembers';
import employeesData from '../../data/employees.json';
import Reports from './Reports';

function TeamPage() {
  return (
    <div>
      <div>
        <Reports/>
      </div>
      <div className="flex justify-center">
        {employeesData.map((employee, index) => (
          <ReportingMembers key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
}

export default TeamPage;