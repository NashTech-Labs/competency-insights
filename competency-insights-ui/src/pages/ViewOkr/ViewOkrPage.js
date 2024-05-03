import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; 
import React from 'react';
import { useDataProvider } from "../../services/dataService";

export const ViewOkrPage = () => {
    const navigate = useNavigate();
    const {user,okr}=useDataProvider();
    const defaultColDef = {
        width: 200, 
        height: 800,
        sortable: true, 
        filter: true,
        floatingFilter: true, 
        resizable: true, 
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

  const handleAddOKRClick = () => {
    console.log("Add OKR button clicked");
    navigate("/addokr");
  };

  const handleUpdateOKRClick = () => {
    console.log("Update OKR button clicked");
    navigate("/updateokr");
  };

  const handleViewOKRClick = () => {
    console.log("View OKR button clicked");
    navigate("/viewokr");
  };

    return (
      <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-30">
        <PermanentDrawerLeft name={user.name} />
        <div className="flex justify-center mt-16">
          <div className="ag-theme-alpine w-full max-w-screen-xl" style={{ fontSize: '16px' }}>
            <div className="bg-gray-300 py-4 px-6 w-full rounded-t-md flex justify-between items-center">
              <button onClick={handleAddOKRClick} className="w-1/3 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg relative">
                Add OKR
                <span className="border-r border-gray-500 absolute h-full top-0 right-0"></span>
              </button>
              <button onClick={handleUpdateOKRClick} className="w-1/3 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg relative">
                Update OKR
                <span className="border-r border-gray-500 absolute h-full top-0 right-0"></span>
              </button>
              <button onClick={handleViewOKRClick} className="w-1/3 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg relative">
                View OKR
              </button>
            </div>
            <AgGridReact
              rowData={okr}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              domLayout='autoHeight' 
              rowHeight={60}
              width={200}
              headerHeight={60} 
              pagination={true} 
              paginationPageSize={10} 
            />
          </div>
        </div>
      </div>
    );
};

export default ViewOkrPage;
