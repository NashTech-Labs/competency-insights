import React, { useState } from 'react';
import {FormElement} from './components/FormElement';
import {useNavigate} from "react-router-dom";
import {PermanentDrawerLeft} from "../../components/Layout/Navbar/TestNavBar"

export const AddOkrPage = () => {
  const navigate = useNavigate();
  const [formData] = useState({
    activity: '',
    radarTechnology: '',
    title: '',
    dueDate: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    alert('OKR created successfully!');
  };

  const handleAddOKRClick = () => {
    console.log("Add OKR button clicked");
    navigate("/addokr");
  };

  const handleUpdateOKRClick = () => {
    console.log("Update OKR button clicked");
    navigate("/updateokr");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 bg-opacity-30">
    <PermanentDrawerLeft /> 
      <div className="w-1/2 flex justify-center mt-20 mb-0">
        <div className="bg-gray-300 py-4 px-6 w-full mb-0 rounded-t-md flex justify-between items-center">
          <button onClick={handleAddOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg"> 
            Add OKR
          </button>
          <div className="h-full border-l border-gray-500"></div>
          <button onClick={handleUpdateOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg"> 
            Update OKR
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <FormElement label="Activity" name="activity" options={['TechHub', 'Knolx', 'Certification', 'Blogs', 'Internal Project']} />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <FormElement label="Radar Technology" name="radarTechnology" options={['Next.js', 'React', 'Tailwind CSS']} />
          </div>
          <div className="w-full px-4 mb-4">
            <FormElement label="Title" name="title" type="text" />
          </div>
          <div className="w-full px-4 mb-4">
            <FormElement label="Due Date" name="dueDate" type="date" />
          </div>
          <div className="w-full px-4 mb-4">
            <FormElement label="Description" name="description" type="textarea" />
          </div>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
          </div>
      </form>
    </div>
  );
}
