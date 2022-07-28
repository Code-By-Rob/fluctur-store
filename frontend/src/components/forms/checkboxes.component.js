import React, { useState, useEffect } from 'react'

const sizes = [
    { id: 0, val: 'XX Small', size: 'XXS', checked: false },
    { id: 1, val: 'X Small', size: 'XS', checked: false },
    { id: 2, val: 'Small', size: 'S', checked: true },
    { id: 3, val: 'Medium', size: 'M', checked: true },
    { id: 4, val: 'Large', size: 'L', checked: true },
    { id: 5, val: 'X Large', size: 'XL', checked: false },
    { id: 6, val: 'XX Large', size: 'XXL', checked: false },
]

export default function Checkboxes({ name, handleChange }) {

    const [values, setValues] = useState(sizes);

    function selectSize(position) {
        console.log(position);
        const newValues = values.map(obj => {
            if (obj.id === position) {
                if (obj.checked === true) {
                    obj.checked = false;
                } else {
                    obj.checked = true;
                }
                return obj;
            }
            return obj;
        })
        setValues(newValues);
    }

    useEffect(() => {
        handleChange({target: {name, value: values}})
    }, [values])

    return (
      <fieldset className="space-y-5 px-12 mt-10 mb-10">
          <h1 className="text-xl font-semibold text-gray-900">Sizes</h1>
        {sizes.map((item) => (
        <div key={item.id} className="relative flex items-start">
            <div className="flex items-center h-5">
                <input
                aria-describedby="comments-description"
                name={item.val}
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                value={JSON.stringify(item)}
                checked={item.checked}
                onChange={() => selectSize(item.id)}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                {item.val}
                </label>
            </div>
        </div>
        ))}
      </fieldset>
    )
  }  