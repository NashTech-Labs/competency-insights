import React from 'react';

export const Reports = () => {
    return (
        <div className='page-container'>
            <div className="flex justify-center items-center mt-5">
                <div className="btn relative from-top px-4 py-2 bg-blue-100 hover:bg-gray-300 text-black font-bold uppercase cursor-pointer transition-all duration-500 ease-in-out ml-4 mr-10">Tasks to review</div>
                <div className="btn relative from-top px-4 py-2 bg-blue-100 hover:bg-gray-300 text-black font-bold uppercase cursor-pointer transition-all duration-500 ease-in-out ml-4 mr-10">Status of your team</div>
                <div className="btn relative from-top px-4 py-2 bg-blue-100 hover:bg-gray-300 text-black font-bold uppercase cursor-pointer transition-all duration-500 ease-in-out ml-4">Quarter report</div>
            </div>
        </div>
    );
}