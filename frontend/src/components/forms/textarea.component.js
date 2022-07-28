import React, { useState, useEffect } from 'react';

export default function Textarea({ label, name, handleChange }) {

  const [value, setValue] = useState('');

  function setText(e) {
    const { value } = e.target;
    setValue(value);
  }

  useEffect(() => {
    handleChange({target: {name, value: value}});
  }, [value]);

    return (
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <textarea
            rows={4}
            name={name}
            id={name}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            defaultValue={''}
            onChange={e => setText(e)}
          />
        </div>
      </div>
    )
  }  