import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ContributionGrid = ({ contributionType }) => {
  const columnDefs = [
    { headerName: 'Title', field: 'title', width: 500 },
    { headerName: 'Technology', field: 'radarTechnology', width: 500 },
    { headerName: 'Status', field: 'status', width: 500 },
  ];

  const rowData = contributionType.map((item, index) => ({
    ...item,
    id: index, 
  }));

  const getRowStyle = (params) => {
    return { fontSize: '16px' };
  };

  if (!contributionType) {
    return <div>No data available</div>;
  }

  return (
        <div className="flex justify-center mt-4">
    <div className="ag-theme-alpine w-full max-w-screen-2xl" style={{ fontSize: '16px' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        rowHeight={60}
        width={200}
        headerHeight={60}
        pagination={true}
        paginationPageSize={10}
        getRowStyle={getRowStyle}
      />
    </div>
    </div>
  );
};

export default ContributionGrid;
