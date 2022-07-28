import { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'

import AccountMenu from '../flyout-menus/account.component'
import ShoppingMenu from '../flyout-menus/shopping-cart.component'
import SearchBar from './search.component'

import ukFlag from '../../assets/flags/united-kingdom-flag.svg'
import FlucturLogo from '../../assets/Logos/Fluctur-Logo.svg'

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        }
      ],
      sections: [
        [
          {
            id: 'shoes',
            name: 'Shoes & Accessories',
            items: [
              { name: 'Sneakers', href: '/Shoes/Trainers' },
              { name: 'Boots', href: '/Shoes/Boots' },
              { name: 'Flats', href: '/Shoes/Flats' },
              { name: 'Sandals', href: '/Shoes/Sandals' },
              { name: 'Heels', href: '/Shoes/Heels' },
              { name: 'Socks', href: '/Shoes/Socks' },
            ],
          },
          {
            id: 'collection',
            name: 'Shop Collection',
            items: [
              { name: 'Everything', href: '/Collection/Everything' },
              { name: 'Core', href: '/Collection/Core' },
              { name: 'New Arrivals', href: '/Collection/New-Arrivals' },
              { name: 'Sale', href: '/Collection/Sale' },
              { name: 'Accessories', href: '/Collection/Accessories' },
            ],
          },
        ],
        [
          {
            id: 'clothing',
            name: 'All Clothing',
            items: [
              { name: 'Blazers', href: '/Clothing/Blazers' },
              { name: 'Blouses & Shirts', href: '/Clothing/Blouses-Shirts' },
              { name: 'Bodysuits, Playsuits, Jumpsuits', href: '/Clothing/Bodysuits-Playsuits-Jumpsuits' },
              { name: 'Dresses', href: '/Clothing/Dresses' },
              { name: 'Hoodies', href: '/Clothing/Hoodies-Sweatshirts' },
              { name: 'Jackets', href: '/Clothing/Jackets' },
              { name: 'Leggings', href: '/Clothing/Leggings' },
              { name: 'Lingerie', href: '/Clothing/Lingerie' },
              { name: 'Sets', href: '/Clothing/Sets' },
              { name: 'Shorts', href: '/Clothing/Shorts' },
              { name: 'Skirts', href: '/Clothing/Skirts' },
              { name: 'Sportswear', href: '/Clothing/Sportswear' },
              { name: 'Sweaters', href: '/Clothing/Sweaters' },
              { name: 'Swimwear', href: '/Clothing/Swimwear' },
              { name: 'Trousers', href: '/Clothing/Trousers' },
              { name: 'Tops', href: '/Clothing/Tops' },
              { name: 'Underwear', href: '/Clothing/Underwear' },
            ],
          },
        ],
        [
          {
            id: 'accessories',
            name: 'All Accessories',
            items: [
              { name: 'Watches', href: '/Accessories/Watches' },
              { name: 'Wallets', href: '/Accessories/Wallets' },
              { name: 'Bags', href: '/Accessories/Bags' },
              { name: 'Sunglasses', href: '/Accessories/Sunglasses' },
              { name: 'Hats', href: '/Accessories/Hats' },
              { name: 'Belts', href: '/Accessories/Belts' },
            ],
          },
        ],
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg',
          imageAlt:
            'Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.',
        },
      ],
      sections: [
        [
          {
            id: 'shoes',
            name: 'Shoes & Accessories',
            items: [
              { name: 'Sneakers', href: '/Shoes/Trainers' },
              { name: 'Boots', href: '/Shoes/Boots' },
              { name: 'Sandals', href: '/Shoes/Sandals' },
              { name: 'Socks', href: '/Shoes/Socks' },
            ],
          },
          {
            id: 'collection',
            name: 'Shop Collection',
            items: [
              { name: 'Everything', href: '/Collection/Everything' },
              { name: 'Core', href: '/Collection/Core' },
              { name: 'New Arrivals', href: '/Collection/New-Arrivals' },
              { name: 'Sale', href: '/Collection/Sale' },
            ],
          },
        ],
        [
          {
            id: 'clothing',
            name: 'All Clothing',
            items: [
              { name: 'Basic Tees', href: '/Clothing/T-Shirts' },
              { name: 'Artwork Tees', href: '/Clothing/Artwork-Tees' },
              { name: 'Pants', href: '/Clothing/Trousers' },
              { name: 'Hoodies', href: '/Clothing/Hoodies' },
              { name: 'Swimsuits', href: '/Clothing/Swimsuits' },
            ],
          },
          {
            id: 'accessories',
            name: 'All Accessories',
            items: [
              { name: 'Watches', href: '/Accessories/Watches' },
              { name: 'Wallets', href: '/Accessories/Wallets' },
              { name: 'Bags', href: '/Accessories/Bags' },
              { name: 'Sunglasses', href: '/Accessories/Sunglasses' },
              { name: 'Hats', href: '/Accessories/Hats' },
              { name: 'Belts', href: '/Accessories/Belts' },
            ],
          },
        ],
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StoreNavigation() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false);

  function openSearchBar() {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  }

  return (
    <div className="bg-white z-40 sticky top-0">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                        <div className="space-y-4">
                          {category.featured.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden"
                            >
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover group-hover:opacity-75"
                              />
                              <div className="flex flex-col justify-end">
                                <div className="p-4 bg-white bg-opacity-60 text-base sm:text-sm">
                                  <a href={item.href} className="font-medium text-gray-900">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {item.name}
                                  </a>
                                  <p aria-hidden="true" className="mt-0.5 text-gray-700 sm:mt-1">
                                    Shop now
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((column, columnIdx) => (
                          <div key={columnIdx} className="space-y-10">
                            {column.map((section) => (
                              <div key={section.name}>
                                <p
                                  id={`${category.id}-${section.id}-heading-mobile`}
                                  className="font-medium text-gray-900"
                                >
                                  {section.name}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <a href="#" className="-m-2 p-2 flex items-center">
                    <img
                      src={ukFlag}
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">GBP</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center justify-between">
              <div className="flex-1 flex items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon className="w-6 h-6" aria-hidden="true" />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:flex-1 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center justify-center transition-colors ease-out duration-200 text-sm font-medium'
                              )}
                            >
                              {category.name}
                              <span
                                className={classNames(
                                  open ? 'bg-indigo-600' : '',
                                  'absolute bottom-0 inset-x-0 h-0.5 transition-colors ease-out duration-200 sm:mt-5 sm:transform sm:translate-y-px'
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="grid grid-rows-1 grid-cols-2 gap-8 text-sm">
                                      {category.featured.map((item, itemIdx) => (
                                        <div
                                          key={item.name}
                                          className={classNames(
                                            itemIdx === 0 ? 'col-span-2 aspect-w-2' : '',
                                            'group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden'
                                          )}
                                        >
                                          <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="object-center object-cover group-hover:opacity-75"
                                          />
                                          <div className="flex flex-col justify-end">
                                            <div className="p-4 bg-white bg-opacity-60 text-sm">
                                              <a href={item.href} className="font-medium text-gray-900">
                                                <span className="absolute inset-0" aria-hidden="true" />
                                                {item.name}
                                              </a>
                                              <p aria-hidden="true" className="mt-0.5 text-gray-700 sm:mt-1">
                                                Shop now
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="grid grid-cols-3 gap-y-10 gap-x-8 text-sm text-gray-500">
                                      {category.sections.map((column, columnIdx) => (
                                        <div key={columnIdx} className="space-y-10">
                                          {column.map((section) => (
                                            <div key={section.name}>
                                              {/* Change the below to link to all items within this section */}
                                              <a
                                                href='#'
                                                id={`${category.id}-${section.id}-heading`}
                                                className="font-medium text-gray-900"
                                              >
                                                {section.name}
                                              </a>
                                              <ul
                                                role="list"
                                                aria-labelledby={`${category.id}-${section.id}-heading`}
                                                className="mt-4 space-y-4"
                                              >
                                                {section.items.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {/* Logo */}
              <Link to="/" className="flex">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-6 w-auto"
                  src={FlucturLogo}
                  alt=""
                />
              </Link>

              <div className="flex-1 flex items-center justify-end">
                <a href="#" className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
                  <img
                    src={ukFlag}
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">GBP</span>
                  <span className="sr-only">, change currency</span>
                </a>

                {/* Search */}
                <a className="hidden ml-6 p-2 text-gray-400 hover:text-gray-500 lg:block cursor-pointer">
                  <span className="sr-only">Search</span>
                  <SearchIcon className="w-6 h-6" aria-hidden="true" onClick={openSearchBar} />
                </a>
                <SearchBar searchFlag={search} />

                {/* Account */}
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
                  <AccountMenu />
                </a>

                {/* Cart */}
                <a href="#" className="group -m-2 p-2 flex items-center">
                  <ShoppingMenu />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}