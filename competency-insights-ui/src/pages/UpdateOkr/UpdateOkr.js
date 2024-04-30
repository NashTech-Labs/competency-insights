import Autocomplete from '@mui/material/Autocomplete';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDataProvider } from '../../services/dataService';

const title1 = [
    { title: 'Java'},
    { title: 'Introduction to react'},
    { title: 'blog 1'},
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const ActivityProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
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
  'Techub',
  'Certification',
  'Knolx',
];

const statuses = [
  'Under Review',
  'Published',
];
export const UpdateOkr = ({emailAddress, name}) => {
  
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [activity, setActivity] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [title, setTitle] = React.useState(null);
  const [link, setLink] = useState('');
  const [dueDate, setDueDate] = useState(currentDate);
  const [submitDate, setSubmitDate] = useState(currentDate);
  const [description, setDescription] = useState('');

  const handleActivityChange = (event) => {
    const {
      target: { value },
    } = event;
    setActivity(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
  const {fetchOKRData} =useDataProvider();

  const handleSubmit = (event) => {
    alert('OKR Updated');
    event.preventDefault();
    console.log('Form submitted with values:', {
      activity,
      status,
      title,
      link,
      dueDate,
      submitDate,
      description,
    }
  );
    // Add your form submission logic here

     fetchOKRData();
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

  const defaultProps = {
    options: title1,
    getOptionLabel: (option) => option.title,
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
            return selected
          }}
          MenuProps={ActivityProps}
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
        {...defaultProps}
        id="title"
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