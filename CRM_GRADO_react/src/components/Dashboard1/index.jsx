import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react';
import { Link, Outlet } from 'react-router-dom';
import { StoreContext } from '@/context/store';
import Logo from '@/assets/logo.png';
import {
  XMarkIcon,
  Bars3CenterLeftIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
import Icon from '@/components/Icon';
import './Dashboard1.css';
import Notifications from '../Notifications';
import { navigation, adminNavigation } from "@/router/Menu";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

navigation.forEach(element => {
  if (element.children) {
    var permissions = [];
    element.children.forEach(element2 => {
      permissions.push(element2.permissions);
    });
    element.permissions = permissions;
  }
});
adminNavigation.forEach(element => {
  if (element.children) {
    var permissions = [];
    element.children.forEach(element2 => {
      permissions.push(element2.permissions);
    });
    element.permissions = permissions;
  }
});

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [open, setOpen] = useState(false) //notifications
  const store = useContext(StoreContext);


  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Notifications open={open} setOpen={setOpen} />
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden no-print" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-700 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-24 w-auto"
                      src={Logo}
                      alt="logo"
                    />
                  </div>
                  <nav
                    className="mt-5 h-full flex-shrink-0 divide-y divide-blue-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="space-y-1 px-2">
                      <nav className="flex-1 space-y-1" aria-label="Sidebar">
                        {navigation.map((item) =>
                          (!item.children && store.checkPermissions(item?.permissions)) ? (
                            <div key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-blue-800 text-white'
                                    : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                  'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                )}
                              >
                                <Icon
                                  name={item.icon}
                                  className="mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </div>
                          ) : ((store.checkPermissionsMenu(item?.permissions)) &&
                            <Disclosure as="div" key={item.name} className="space-y-1">
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className={classNames(
                                      item.current
                                        ? 'bg-blue-800 text-white'
                                        : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                      'group w-full flex items-center pl-2 pr-1 py-2 text-left font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white'
                                    )}

                                  >
                                    <Icon
                                      name={item.icon}
                                      className={classNames(
                                        open
                                          ? 'text-white'
                                          : 'text-gray-300',
                                        "mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="flex-1">{item.name}</span>
                                    <svg
                                      className={classNames(
                                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                        'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-white'
                                      )}
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                    >
                                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                    </svg>
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="space-y-1">
                                    {item.children.map((subItem) => (
                                      (store.checkPermissions(subItem?.permissions)) &&
                                      <Link key={subItem.name} to={subItem.href}>
                                        <Disclosure.Button
                                          as="a"
                                          className="group flex w-full items-center rounded-md py-2 pl-8 pr-2 font-medium text-white hover:text-black"
                                        >
                                          <Icon
                                            name={subItem.icon}
                                            className="text-blue-200 group-hover:text-black mr-4 h-6 w-6 flex-shrink-0"
                                            aria-hidden="true"
                                          />
                                          {subItem.name}
                                        </Disclosure.Button>
                                      </Link>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          )
                        )}
                      </nav>
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="space-y-1 px-2">
                        {store.user.is_admin &&
                          <nav className="flex-1 space-y-1" aria-label="Sidebar">
                            {adminNavigation.map((item) =>
                              (!item.children && store.checkPermissions(item?.permissions)) ? (
                                <div key={item.name}>
                                  <Link
                                    to={item.href}
                                    className={classNames(
                                      item.current
                                        ? 'bg-blue-800 text-white'
                                        : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                      'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                    )}
                                  >
                                    <Icon
                                      name={item.icon}
                                      className="mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </Link>
                                </div>
                              ) : (store.checkPermissionsMenu(item?.permissions) &&
                                <Disclosure as="div" key={item.name} className="space-y-1">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        className={classNames(
                                          item.current
                                            ? 'bg-blue-800 text-white'
                                            : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                          'group w-full flex items-center pl-2 pr-1 py-2 text-left font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white'
                                        )}

                                      >
                                        <Icon
                                          name={item.icon}
                                          className={classNames(
                                            open
                                              ? 'text-white'
                                              : 'text-gray-300',
                                            "mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                          )}
                                          aria-hidden="true"
                                        />
                                        <span className="flex-1">{item.name}</span>
                                        <svg
                                          className={classNames(
                                            open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                            'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-white'
                                          )}
                                          viewBox="0 0 20 20"
                                          aria-hidden="true"
                                        >
                                          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                        </svg>
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-1">
                                        {item.children.map((subItem) => (
                                          (store.checkPermissions(subItem?.permissions)) &&
                                          <Link key={subItem.name} to={subItem.href}>
                                            <Disclosure.Button
                                              as="a"
                                              className="group flex w-full items-center rounded-md py-2 pl-8 pr-2 font-medium text-white hover:text-black"
                                            >
                                              <Icon
                                                name={subItem.icon}
                                                className="text-blue-200 group-hover:text-black mr-4 h-6 w-6 flex-shrink-0"
                                                aria-hidden="true"
                                              />
                                              {subItem.name}
                                            </Disclosure.Button>
                                          </Link>
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              )
                            )}
                          </nav>
                        }
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col no-print">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto drop-shadow-2xl bg-blue-700 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-32 w-auto"
                src={Logo}
                alt="logo"
              />
            </div>
            <nav className="mt-5 flex flex-1 flex-col divide-y divide-blue-800 overflow-y-auto" aria-label="Sidebar">
              <div className="space-y-1 px-2">
                <nav className="flex-1 space-y-1" aria-label="Sidebar">
                  {navigation.map((item) =>
                    (!item.children && store.checkPermissions(item?.permissions)) ? (
                      <div key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-blue-800 text-white'
                              : 'text-blue-100 hover:text-white hover:bg-blue-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <Icon
                            name={item.icon}
                            className="mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </div>
                    ) : (store.checkPermissionsMenu(item?.permissions) &&
                      <Disclosure as="div" key={item.name} className="space-y-1">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? 'bg-blue-800 text-white'
                                  : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                'group w-full flex items-center pl-2 pr-1 py-2 text-left font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white'
                              )}

                            >
                              <Icon
                                name={item.icon}
                                className={classNames(
                                  open
                                    ? 'text-white'
                                    : 'text-gray-300',
                                  "mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                )}
                                aria-hidden="true"
                              />
                              <span className="flex-1">{item.name}</span>
                              <svg
                                className={classNames(
                                  open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                  'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-white'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map((subItem) => (
                                (store.checkPermissions(subItem?.permissions)) &&
                                <Link key={subItem.name} to={subItem.href}>
                                  <Disclosure.Button
                                    as="a"
                                    className="group flex w-full items-center rounded-md py-2 pl-8 pr-2 font-medium text-white hover:text-black"
                                  >
                                    <Icon
                                      name={subItem.icon}
                                      className="text-blue-200 group-hover:text-black mr-4 h-6 w-6 flex-shrink-0"
                                      aria-hidden="true"
                                    />
                                    {subItem.name}
                                  </Disclosure.Button>
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </nav>
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 px-2">
                  {store.user.is_admin &&
                    <nav className="flex-1 space-y-1" aria-label="Sidebar">
                      {adminNavigation.map((item) =>
                        (!item.children && store.checkPermissions(item?.permissions)) ? (
                          <div key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-blue-800 text-white'
                                  : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                              )}
                            >
                              <Icon
                                name={item.icon}
                                className="mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </div>
                        ) : (store.checkPermissionsMenu(item?.permissions) &&
                          <Disclosure as="div" key={item.name} className="space-y-1">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.current
                                      ? 'bg-blue-800 text-white'
                                      : 'text-blue-100 hover:text-white hover:bg-blue-600',
                                    'group w-full flex items-center pl-2 pr-1 py-2 text-left font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white'
                                  )}

                                >
                                  <Icon
                                    name={item.icon}
                                    className={classNames(
                                      open
                                        ? 'text-white'
                                        : 'text-gray-300',
                                      "mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="flex-1">{item.name}</span>
                                  <svg
                                    className={classNames(
                                      open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                      'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-white'
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">
                                  {item.children.map((subItem) => (
                                    (store.checkPermissions(subItem?.permissions)) &&
                                    <Link key={subItem.name} to={subItem.href}>
                                      <Disclosure.Button
                                        as="a"
                                        className="group flex w-full items-center rounded-md py-2 pl-8 pr-2 font-medium text-white hover:text-black"
                                      >
                                        <Icon
                                          name={subItem.icon}
                                          className="text-blue-200 group-hover:text-black mr-4 h-6 w-6 flex-shrink-0"
                                          aria-hidden="true"
                                        />
                                        {subItem.name}
                                      </Disclosure.Button>
                                    </Link>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                    </nav>
                  }
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-blue-100 no-print">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="w-full flex px-1 rounded-md border-gray-500">
              <div className="w-full ml-4 flex justify-end items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-gray-200 hover:bg-gray-300 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6 text-blue-600 animate-pulse" aria-hidden="true" onClick={() => setOpen(!open)} />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="bg-gray-200 flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-300">
                      {store?.user?.photo_url != ""
                        ? <img
                          className="h-8 w-8 rounded-full"
                          src={store.user.photo_url}
                          alt=""
                        />
                        :
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white">{store.user.name[0].toUpperCase()}</span>
                        </span>
                      }
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>{store?.user?.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard/user/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => store.logout()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                          >
                            Cerrar Sesión
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            <div className="relative z-0 mt-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}