/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/outline'
import { Popover, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/solid'

import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../redux/reducer'

export default function ShoppingMenu() {

    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();

  return (
      <>
        {/* Cart */}
        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
            <Popover.Button className="group -m-2 p-2 flex items-center">
                <ShoppingBagIcon
                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.length}</span>
                <span className="sr-only">items in cart, view bag</span>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                <h2 className="sr-only">Shopping Cart</h2>

                <div className="max-w-2xl mx-auto px-4">
                    <ul role="list" className="divide-y py-2 divide-gray-200">
                    {cart.map((item, index) => (
                        <li key={item.product._id} className="py-6 flex items-center">
                        <img
                            src={`http://localhost:3000/api/images/${item.product.images[0]}`}
                            className="flex-none w-16 h-16 rounded-md border border-gray-200"
                        />
                        <div className="ml-4 flex-auto">
                            <h3 className="font-medium text-gray-900">
                            <a href={`/Product/${item.product._id}/${item.product.name}`}>{item.product.name}</a>
                            </h3>
                            <p className="text-gray-500">{item.product.colour}</p>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Remove</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" onClick={() => dispatch(remove({index}))} />
                            </button>
                        </div>
                        </li>
                    ))}
                    </ul>

                    <a href='/Checkout'>
                        <button
                        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                        Checkout
                        </button>
                    </a>

                    <p className="mt-6 text-center">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View Shopping Bag
                    </a>
                    </p>
                </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    </>
  )
}