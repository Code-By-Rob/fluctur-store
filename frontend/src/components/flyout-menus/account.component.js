/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {
  CursorClickIcon,
  ChipIcon,
  PhoneIcon,
  PlayIcon,
  GiftIcon,
  PencilAltIcon,
  ViewGridIcon,
  UserIcon
} from '@heroicons/react/outline'

const account = [
  {
    name: 'Account',
    description: 'Manage your account details. Such as name, address, and card info.',
    href: '/Account/User',
    icon: UserIcon,
  },
  {
    name: 'Admin',
    description: 'Go to the admin dashboard.',
    href: '/Admin/Dashboard',
    icon: ChipIcon,
  },
  {
    name: 'Orders',
    description: 'See where, when, and what you have bought.',
    href: '/Account/Orders',
    icon: CursorClickIcon,
  },
  { name: 'Reviews', description: "Your reviews, if you ever want to change them.", href: '#', icon: PencilAltIcon },
  {
    name: 'Coupons',
    description: "Your coupons for shopping with us.",
    href: '/Account/Coupons',
    icon: ViewGridIcon,
  },
  {
    name: 'Rewards',
    description: 'Complete tasks to earn rewards.',
    href: '/Account/Rewards',
    icon: GiftIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AccountMenu() {
  return (
    <Popover className="relative w-6 h-6 mr-2">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span className="sr-only">Account</span>
            <UserIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'h-5 w-5 group-hover:text-gray-500')}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 transform -translate-x-3/4 mt-3 px-2 w-screen max-w-md sm:px-0 sm:translate-none">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {account.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  {callsToAction.map((item) => (
                    <div key={item.name} className="flow-root">
                      <a
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}