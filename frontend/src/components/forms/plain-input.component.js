/*
  
*/

export default function PlainInput({ handleChange, value, name, id }) {
    return (
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="email"
            name={name}
            id={id}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0"
            onChange={handleChange}
            defaultValue={value}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              cm
            </span>
          </div>
        </div>
      </div>
    )
  }
  