import React from 'react';
import './FlipCard.css';

function Reports() {
    return (
        <div className='page-container'>
        <div className='buttons-container flex'>
            <div className="btn relative from-top px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase cursor-pointer transition-all duration-500 ease-in-out ml-4">Tasks to review</div>
            <div className="btn relative from-top px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase cursor-pointer transition-all duration-500 ease-in-out ml-4">Status of your team</div>
            <div className="btn relative from-top px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase cursor-pointer transition-all duration-500 ease-in-out ml-4">Quarter report</div>
        </div>
        </div>
    );
}

export default Reports;
