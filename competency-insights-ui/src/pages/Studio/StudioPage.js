import React, { useState, useEffect } from 'react';
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import { AgGridReact } from 'ag-grid-react';
import { SkeletonProfile } from "../../components/Layout/SkeletonProfile"; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";

export const StudioPage = ({ name }) => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const okrDataUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}`;

  useEffect(() => {
    fetchBackendData()
      .then((response) => {
        console.log('Fetched data:', response);
        setRowData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const fetchBackendData = async () => {
    const response = await fetch(okrDataUrl);
    const data = await response.json();
    return data;
  };

  const columnDefs = [
    { headerName: 'Competency', field: 'competency', filter: true },
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Activity', field: 'activity', filter: true },
    { headerName: 'Radar Technology', field: 'radarTechnology', filter: true },
    { headerName: 'Title', field: 'title', filter: true },
    { headerName: 'Due Date', field: 'dueDate', filter: true },
    { headerName: 'Submission Date', field: 'submissionDate', filter: true },
    { headerName: 'Link', field: 'link', filter: true },
    { headerName: 'Status', field: 'status', filter: true },
  ];

  return (
    <>
      <PermanentDrawerLeft name={name} />
      <div className='flex justify-center ml-60 px-20'>
        {loading ? (
          <SkeletonProfile />
        ) : rowData && rowData.length > 0 ? (
          <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              suppressCellSelection={true}
              enableFilter={true}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
                <img
                    src="/no_data_found.jpeg"
                    className="mx-auto"
                    alt="No data found"
                />
            </div>
        )}
      </div>
    </>
  );
};
