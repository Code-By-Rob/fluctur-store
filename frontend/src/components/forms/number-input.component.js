import React from 'react'

const NumberInput = ({ label, name, id, placeholder, handleChange }) => {
  return (
    <div>
        <label htmlFor='product-name' className='block text-sm font-medium text-gray-500'>
            {label}
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
            <input
                type='number'
                name={name}
                id={id}
                className='shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                placeholder={placeholder}
                onChange={handleChange}
                min='0'
            />
        </div>
    </div>
  )
}

export default NumberInput