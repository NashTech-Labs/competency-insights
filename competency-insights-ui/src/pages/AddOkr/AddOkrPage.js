import React, { useEffect, useState } from 'react';
import { FormElement } from './components/FormElement';
import { useNavigate } from "react-router-dom";
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import Button from '@mui/material/Button';

export const AddOkrPage = ({name}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activity: '',
    radarTechnology: '',
    competency: '',
    status:'Draft',
    title: '',
    dueDate: '',
    description: '',
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setFormData(prevFormData => ({
        ...prevFormData,
        competency: userData.department
      }));
    }
  }, []);

  const addOkrPageUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_ADD_OKR_PAGE_URL}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accessToken = sessionStorage.getItem("token");
      const response = await fetch(addOkrPageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log('OKR created successfully!');
        console.log(formData);
          // clearing users data nd okrdata
    const storedUserData = localStorage.removeItem("userData");
    const storedOkrData = localStorage.removeItem("okrsData");
      } else {
        // Handle errors
        console.error('Failed to create OKR');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 bg-opacity-30">
      <PermanentDrawerLeft name = {name} />
      <div className="w-1/2 flex justify-center mt-20 mb-0">
        <div className="bg-gray-300 py-4 px-6 w-full mb-0 rounded-t-md flex justify-between items-center">
          <button onClick={handleAddOKRClick} className="w-1/3 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg flex items-center justify-center">
           Add OKR
          </button>
          <div className="h-full border-l border-gray-500"></div>
          <button onClick={handleUpdateOKRClick} className="w-1/3 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg flex items-center justify-center">
           Update OKR
          </button>
          <div className="h-full border-l border-gray-500"></div>
          <button onClick={handleViewOKRClick} className="w-1/3 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg flex items-center justify-center">
            View OKR
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <FormElement label="Activity" name="activity" options={['TechHub', 'Knolx', 'Certification', 'Blogs', 'Internal Project']} onChange={handleChange} />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <FormElement label="Radar Technology" name="radarTechnology" options={['Next.js', 'React', 'Tailwind CSS']} onChange={handleChange} />
          </div>
          <div className="w-full px-4 mb-4">
            <FormElement label="Title" name="title" type="text" onChange={handleChange}/>
          </div>
          <div className="w-full px-4 mb-4">
            <FormElement label="Due Date" name="dueDate" type="date" onChange={handleChange}/>
          </div>
          <div className="w-full px-4 mb-4">
            <FormElement label="Description" name="description" type="textarea" onChange={handleChange}/>
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="submit" variant="contained" color="success" >Submit</Button>
          <Button type="button" variant="contained" color="error" >Cancel</Button>
        </div>
      </form>
    </div>
  );
};