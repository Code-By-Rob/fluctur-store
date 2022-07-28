const options = [
    { id: 1, val: 'GBP' },
    { id: 2, val: 'USD' },
    { id: 3, val: 'CAD' },
    { id: 4, val: 'EUR' },
    { id: 5, val: 'TRY' },
    { id: 6, val: 'BGN' },
    { id: 7, val: 'DKK' },
    { id: 8, val: 'NOK' },
    { id: 9, val: 'PLN' },
    { id: 10, val: 'CHF' },
]

export default function MultiPriceInput({ label, name, id, handleChange }) {
    return (
      <div>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">£</span>
          </div>
          <input
            type="text"
            name={name}
            id={id}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
                {
                    options.map(item => (
                        <option key={item.id}>
                            {item.val}
                        </option>
                    ))
                }
            </select>
          </div>
        </div>
      </div>
    )
  }  