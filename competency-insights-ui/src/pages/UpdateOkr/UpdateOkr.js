import Autocomplete from '@mui/material/Autocomplete';
import React, {useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const StatusProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const activities = [
  'Blog',
  'TechHub',
  'Certification',
  'Knolx',
];

const statuses = [
  'draft',
  'Under Review',
  'Published',
];
export const UpdateOkr = ({emailAddress, name}) => {
  
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [activity, setActivity] = React.useState('');
  const [status, setStatus] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const [title, setTitle] = React.useState(null);
  const [link, setLink] = React.useState('');
  const [dueDate, setDueDate] = React.useState(currentDate);
  const [submitDate, setSubmitDate] = React.useState(currentDate);
  const [description, setDescription] = React.useState('');

  const handleActivityChange = (event) => {
    const {
      target: { value },
    } = event;
    setActivity(
      value
    );
    console.log('Activity', value)
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTitleChange = (event, newValue) => {
    setTitle(newValue);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSubmitDateChange = (event) => {
    setSubmitDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const okrDataUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}/${emailAddress}`;

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(okrDataUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch titles');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        const dataArray = Array.isArray(data) ? data : [data];
        console.log(dataArray);
        // Filter titles based on the selected activity
        const filteredTitles = dataArray.filter(item => item.activity === activity).map(item => item.title);

        console.log('Filtered Titles:', filteredTitles);
  
        // Set the filtered titles in the state
        setTitles(filteredTitles);
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };
  
    // Call fetchTitles only when activity is not empty
    if (activity) {
      fetchTitles();
    }
  }, [activity]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(okrDataUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        const dataArray = Array.isArray(data) ? data : [data];
        const selectedDetails = dataArray.find(item => item.title === title);
        if (selectedDetails) {
          const { dueDate: fetchedDueDate, submissionDate: fetchedSubmissionDate, status: fetchedStatus, description: fetchedDescription } = selectedDetails;
          // Set fetched details
          setDueDate(fetchedDueDate);
          setSubmitDate(fetchedSubmissionDate);
          setStatus(fetchedStatus);
          setDescription(fetchedDescription);
        } 
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
  
    fetchDetails();
  }, [title]);
  

  const updateOkrPageUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_UPDATE_OKR_PAGE_URL}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      activity,
      status,
      title,
      link,
      dueDate,
      submitDate,
      description
    };
  
    try {
      const accessToken = sessionStorage.getItem("token");
      // Send a PUT request to json-server with the payload
      const response = await fetch(updateOkrPageUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update record');
      }
      console.log('Record updated successfully');
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleCancel = () => {
    // Add your cancel logic here
    console.log('Form canceled');
  };

  const handleAddOKRClick = () => {
    navigate("/addokr");
  };

  const handleUpdateOKRClick = () => {
    navigate("/updateokr");
  };

  const handleViewOKRClick = () => {
    console.log("View OKR button clicked");
    navigate("/viewokr");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 bg-opacity-30">

    <PermanentDrawerLeft name = {name} />
      <div className="w-1/2 flex justify-center mt-20 mb-0">
        <div className="bg-gray-300 py-4 px-6 w-full mb-0 rounded-t-md flex justify-between items-center">
          <button onClick={handleAddOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg">
            Add OKR
          </button>
          <div className="h-full border-l border-gray-500"></div>
          <button onClick={handleUpdateOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg">
            Update OKR
          </button>
          <div className="h-full border-l border-gray-500"></div>
          <button onClick={handleViewOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg">
          View OKR
        </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="activity" className="block text-gray-700 text-sm font-bold mb-2">Activity</label>
            <Select
              displayEmpty
              value={activity}
              onChange={handleActivityChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Activity</em>;
                }
                return selected;
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              className="w-full border rounded-md bg-white focus:border-black"
            >
              <MenuItem disabled value="">
                <em>Activity</em>
              </MenuItem>
              {activities.map((activity) => (
                <MenuItem
                  key={activity}
                  value={activity}
                >
                  {activity}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2 bg-white">Status</label>
            <Select
          displayEmpty
          value={status}
          onChange={handleStatusChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Status</em>;
            }
            return selected
          }}
          MenuProps={StatusProps}
          inputProps={{ 'aria-label': 'Without label' }}
          className="w-full border rounded-md bg-white focus:border-black"
        >
          <MenuItem disabled value="">
            <em>Status</em>
          </MenuItem>
          {statuses.map((status) => (
            <MenuItem
              key={status}
              value={status}
            >
              {status}
            </MenuItem>
          ))}
        </Select>
          </div>
          <div className="w-full px-4 mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <Autocomplete
        id="title"
        options={titles}
        value={title}
        onChange={handleTitleChange}
        renderInput={(params) => (
          <TextField {...params} variant="standard" />
        )}
      />
          </div>
          <div className="w-full px-4 mb-4">
            <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">Link</label>
            <input type="text" id="link" value={link} onChange={handleLinkChange} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
            <input type="date" id="dueDate" value={dueDate} onChange={handleDueDateChange} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="submitDate" className="block text-gray-700 text-sm font-bold mb-2">Submission Date</label>
            <input type="date" id="submitDate" value={submitDate} onChange={handleSubmitDateChange} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full px-4 mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea id="description" value={description} onChange={handleDescriptionChange} className="w-full border rounded-md p-2 focus:border-black"></textarea>
          </div>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOkr;