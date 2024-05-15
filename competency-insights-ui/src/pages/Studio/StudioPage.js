import React, { useState, useEffect } from 'react';
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import { AgGridReact } from 'ag-grid-react';
import { SkeletonProfile } from "../../components/Layout/SkeletonProfile"; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDataProvider } from '../../services/dataService';

export const StudioPage = () => {

  const { user,studioData,fetchStudioData } = useDataProvider();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (studioData.length === 0 ) {
          await fetchStudioData();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching studio data:', error);
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

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
      <PermanentDrawerLeft name={user.name} />
      <div className='flex justify-center ml-60 px-20'>
        {loading ? (
          <SkeletonProfile />
        ) : studioData && studioData.length > 0 ? (
          <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
              rowData={studioData}
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
