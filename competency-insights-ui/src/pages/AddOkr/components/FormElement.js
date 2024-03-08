import React from 'react';

export const FormElement = ({ label, name, options, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label text-lg font-bold mb-2">{label}</label>
      {type === 'text' ? (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={`Enter ${label}`}
          className="bg-gray-100 shadow-md rounded px-4 py-2 mb-4 w-full"
          required
        />
      ) : type === 'date' ? (
        <input
          type={type}
          name={name}
          id={name}
          className="bg-gray-100 shadow-md rounded px-4 py-2 mb-4 w-full"
          required
        />
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className="resize-none bg-gray-100 shadow-md rounded px-4 py-2 mb-4 w-full"
          rows="4"
          placeholder={`Enter ${label}`}
        ></textarea>
      ): (
        <select id={name} name={name} required className="bg-gray-100 shadow-md rounded px-4 py-2 mb-4 w-full">
          <option value="">-- Select {label} --</option>
          {options && options.length > 0 && options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
