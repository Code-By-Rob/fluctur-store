import React, { useState, useEffect } from "react"
import PlainInput from "./plain-input.component"

const plans = [
    {
        id: 1,
        name: 'Small',
        sleeveLength: '',
        bust: '',
        waist: '',
        hips: '',
        length: '',
        isCurrent: false,
    },
    {
        id: 2,
        name: 'Medium',
        sleeveLength: '',
        bust: '',
        waist: '',
        hips: '',
        length: '',
    },
    {
        id: 3,
        name: 'Large',
        sleeveLength: '',
        bust: '',
        waist: '',
        hips: '',
        length: '',
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function SizingTable({ name, productSizes, handleChange }) {

    const [sizes, setSizes] = useState({
        Small: {
            sleeveLength: '',
            bust: '',
            waist: '',
            hips: '',
            length: '',
        },
        Medium: {
            sleeveLength: '',
            bust: '',
            waist: '',
            hips: '',
            length: '',
        },
        Large: {
            sleeveLength: '',
            bust: '',
            waist: '',
            hips: '',
            length: '',
        },
    })

    function selectSize(e) {
      const { name, id, value } = e.target;
      setSizes(prevValues => ({
        ...prevValues,
        [name]: {
          ...prevValues[name],
          [id]: value
        }
      }))
      }

    useEffect(() => {
        handleChange({target: {name, value: sizes}});
    }, [sizes]);

    return (
      <div className="mt-4 mb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Sizing Reference</h1>
            <p className="mt-2 text-sm text-gray-700">
              Change the sizing reference of the product, if needed.
            </p>
          </div>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6">
                  Size
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-500 lg:table-cell"
                >
                  Sleeve Length
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-500 lg:table-cell"
                >
                  Bust
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-500 lg:table-cell"
                >
                  Waist
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">
                  Hips
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">
                  Length
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, planIdx) => (
                <tr key={plan.id}>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-transparent',
                      'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {plan.name}
                    </div>
                    <div className="mt-1 flex flex-col text-gray-900 sm:block lg:hidden">
                      <span>
                        {plan.sleeveLength} / {plan.bust}
                      </span>
                      <span className="hidden sm:inline"> · </span>
                      <span>{plan.hips}</span>
                    </div>
                    {planIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-900 lg:table-cell'
                    )}
                  >
                    <PlainInput handleChange={e => selectSize(e)} name={plan.name} id={'sleeveLength'} value={plan.sleeveLength} />
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-900 lg:table-cell'
                    )}
                  >
                    <PlainInput handleChange={e => selectSize(e)} name={plan.name} id={'bust'} value={plan.bust} />
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-900 lg:table-cell'
                    )}
                  >
                    <PlainInput handleChange={e => selectSize(e)} name={plan.name} id={'waist'} value={plan.waist} />
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'px-3 py-3.5 text-sm text-gray-900'
                    )}
                  >
                    <PlainInput handleChange={e => selectSize(e)} name={plan.name} id={'hips'} value={plan.hips} />
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'px-3 py-3.5 text-sm text-gray-900'
                    )}
                  >
                    <PlainInput handleChange={e => selectSize(e)} name={plan.name} id={'length'} value={plan.length} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }  