import React from "react";
import '../styles/modal.css';

export const DialogSizes = ({ open, onClose }) => {
  return (
    <div className={open ? "modal-overlay flex items-center justify-center" : "hidden"}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="text-lg font-bold">Its a simple dialog.</h3>
        </div>
        <div className="modal-body">
          <p>The key to more success is to have a lot of pillows.</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button onClick={onClose} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
