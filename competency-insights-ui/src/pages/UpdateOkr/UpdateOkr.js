import React, { useState } from 'react';
import { Footer, Header, Navbar } from '../../components';
import {useNavigate} from "react-router-dom";

export const UpdateOkr = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [date1, setDate1] = useState(currentDate);
  const [date2, setDate2] = useState(currentDate);
  const [textarea, setTextarea] = useState('');

  const handleDropdown1Change = (event) => {
    setDropdown1(event.target.value);
  };

  const handleDropdown2Change = (event) => {
    setDropdown2(event.target.value);
  };

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleDate1Change = (event) => {
    setDate1(event.target.value);
  };

  const handleDate2Change = (event) => {
    setDate2(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setTextarea(event.target.value);
  };

  const handleSubmit = (event) => {
    alert('OkR Updated')
    event.preventDefault();
    console.log('Form submitted with values:', {
      dropdown1,
      dropdown2,
      input1,
      input2,
      date1,
      date2,
      textarea,
    });
    // Add your form submission logic here
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
  return (  
    <div className="flex flex-col items-center min-h-screen bg-gray-200 bg-opacity-30">
    <Navbar />
      <div className="w-1/2 flex justify-center mt-20 mb-0">
        <div className="bg-gray-300 py-4 px-6 w-full mb-0 rounded-t-md flex justify-between items-center">
          <button onClick={handleAddOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg"> {/* Adjusted button width, font weight, and font size */}
            Add OKR
          </button>
          <div className="h-full border-l border-gray-500"></div> {/* Line of separation */}
          <button onClick={handleUpdateOKRClick} className="w-1/2 py-2 px-4 mb-0 rounded focus:outline-none focus:shadow-outline font-bold text-lg"> {/* Adjusted button width, font weight, and font size */}
            Update OKR
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="dropdown1" className="block text-gray-700 text-sm font-bold mb-2">Activity</label>
            <select id="dropdown1" value={dropdown1} onChange={handleDropdown1Change} className="w-full border rounded-md p-2 bg-white focus:border-black">
              <option value="Blog">Blog</option>
              <option value="Techub">Techub</option>
              <option value="Certification">Certification</option>
              <option value="Knolx">Knolx</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="dropdown2" className="block text-gray-700 text-sm font-bold mb-2 bg-white">Status</label>
            <select id="dropdown2" value={dropdown2} onChange={handleDropdown2Change} className="w-full border rounded-md p-2 bg-white focus:border-black">
              <option value="Under Review">Under Review</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div className="w-full px-4 mb-4">
            <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input type="text" id="input1" value={input1} onChange={handleInput1Change} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full px-4 mb-4">
            <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">Link</label>
            <input type="text" id="input2" value={input2} onChange={handleInput2Change} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="date1" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
            <input type="date" id="date1" value={date1} onChange={handleDate1Change} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="date2" className="block text-gray-700 text-sm font-bold mb-2">Submission Date</label>
            <input type="date" id="date2" value={date2} onChange={handleDate2Change} className="w-full border rounded-md p-2 focus:border-black" />
          </div>
          <div className="w-full px-4 mb-4">
            <label htmlFor="textarea" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea id="textarea" value={textarea} onChange={handleTextareaChange} className="w-full border rounded-md p-2 focus:border-black"></textarea>
          </div>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}
