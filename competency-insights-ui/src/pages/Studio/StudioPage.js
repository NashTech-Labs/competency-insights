import React, { useState, useEffect } from 'react';
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";

export const StudioPage = ({ emailAddress, name }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchBackendData()
      .then((response) => {
        setRowData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchBackendData = async () => {
    const response = await fetch('Data/studioData.json');
    const data = await response.json();
    return data;
  };

  const columnDefs = [
    { headerName: 'Competency', field: 'competency' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Activity', field: 'activity' },
    { headerName: 'Radar Technology', field: 'radarTechnology' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Due Date', field: 'dueDate' },
    { headerName: 'Submission Date', field: 'submissionDate' },
    { headerName: 'Link', field: 'link' },
    { headerName: 'Status', field: 'status' },
  ];

  return (
    <>
      <PermanentDrawerLeft name={name} />
      <div className='flex justify-center ml-60 px-20'>
      <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10} // Adjust as needed
          suppressCellSelection={true}
        />
      </div>
      </div>
    </>
  );
};
