import React, { useState } from 'react';
import AddHomeIcon from '@mui/icons-material/AddHome';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import '../../../src/styles/navbar.css';  
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import logo from '../../assets/nashtech_logo.png';

/**
 * Navbar component representing a sidebar with navigation links and dropdown menus.
 * @returns {JSX.Element} Navbar component
 */
const Navbar = () => {
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [meDropdownOpen, setMeDropdownOpen] = useState(false);

  /**
   * Handles mouse enter event for the team dropdown.
   */
  const handleTeamMouseEnter = () => {
    setTeamDropdownOpen(true);
  };

  /**
   * Handles mouse leave event for the team dropdown.
   */
  const handleTeamMouseLeave = () => {
    setTeamDropdownOpen(false);
  };

  /**
   * Handles mouse enter event for the 'Me' dropdown.
   */
  const handleMeMouseEnter = () => {
    setMeDropdownOpen(true);
  };

  /**
   * Handles mouse leave event for the 'Me' dropdown.
   */
  const handleMeMouseLeave = () => {
    setMeDropdownOpen(false);
  };

  return (
    <div className={"bg-gray-800 h-screen fixed left-0 top-0 flex flex-col"} style={{ width: '100px' }}>
      <ul className='flex flex-col space-y-2 my-0'>
        <li className="bg-gray-400 p-1">
          <img src={logo} alt="Logo" className="mx-auto" style={{ maxWidth: '90%', maxHeight: '90%'}}/>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white px-4 py-2 block flex flex-col items-center sidebar-link">
            <AddHomeIcon />
            <span>Home</span>
          </a>
        </li>
        <li 
          onMouseEnter={handleMeMouseEnter}
          onMouseLeave={handleMeMouseLeave}
          className="relative"> 
          <a href="#" className="text-gray-300 hover:text-white px-4 py-2 block flex flex-col items-center sidebar-link">
            <PersonRoundedIcon />
            <span>Me</span>
          </a>
          {meDropdownOpen && (
            <div className="absolute top-6 left-full bg-gray-700" >
              {/* Dropdown content */}
              <a href="#" className="text-gray-300 hover:text-white block py-1 px-2 sidebar-link w-40">Add OKRs</a>
              <a href="#" className="text-gray-300 hover:text-white block py-1 px-2 sidebar-link">Update OKRs</a>
            </div>
          )}
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white px-4 py-2 block flex flex-col items-center sidebar-link">
            <MessageIcon></MessageIcon>
            <span>Message</span>
          </a>
        </li>
        <li
          onMouseEnter={handleTeamMouseEnter}
          onMouseLeave={handleTeamMouseLeave}
          className="relative">
          <a href="#" className="text-gray-300 hover:text-white px-4 py-2 block flex flex-col items-center sidebar-link">
            <Groups2RoundedIcon />
            <span>Team</span>
          </a>
          {teamDropdownOpen && (
            <div className="absolute top-6 left-full bg-gray-700">
              {/* Dropdown content */}  
              <a href="#" className="text-gray-300 hover:text-white block py-1 px-2 sidebar-link w-40">My team</a>
              <a href="#" className="text-gray-300 hover:text-white block py-1 px-2 sidebar-link">Reporting Team</a>
            </div>
          )}
        </li>   
      </ul>
    </div>
  );
}

export default Navbar;
