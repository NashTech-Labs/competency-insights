import React, { useState } from "react";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {DialogSizes} from "./Modal";

export const DropdownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleDetailsClick = () => {
    setOpenDropdown(false); // Close the dropdown
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <div className="inline-block" style={{ margin: "5px" }}>
      <button onClick={() => setOpenDropdown((prev) => !prev)}>
       <MoreHorizOutlinedIcon/>
      </button>
      {openDropdown && (
        <div className="absolute mt-1 shadow-md rounded-md bg-white z-50">
          <ul className="py-1">
            <li className="px-2">
              <RemoveRedEyeOutlinedIcon/>
                View
              
            </li>
            <li>
            
              <button
                className="block px-2 py-2 hover:bg-gray-100 w-full text-left"
                onClick={handleDetailsClick}
              >
              <SignalCellularAltOutlinedIcon/>
                Details
              </button>
            </li>
          </ul>
        </div>
      )}
      {openModal && (
        <div className="modal-overlay">
          <DialogSizes open={openModal} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
