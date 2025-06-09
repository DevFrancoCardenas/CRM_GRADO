import { Fragment, useContext, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, Outlet } from 'react-router-dom';
import { StoreContext } from '@/context/store';
import Logo from '@/assets/logo.png';
import {
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
import './Dashboard2.css';
import Notifications from '../Notifications';
import { navigation, adminNavigation } from "@/router/Menu";
import SideMenu from '../SideMenu';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
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
      <Notifications open={open} setOpen={setOpen} />
      <div className="min-h-full flex overflow-hidden max-w-screen mx-auto">
        {/* SIDE MENU */}
        <SideMenu navigation={navigation} adminNavigation={adminNavigation} store={store} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="bborder-b border-blue-300 border-opacity-25 bg-blue-700 lg:border-none pb-32">
          <div className="  px-3 sm:px-6 2xl:px-10 ">

            <div className="relative flex py-2  h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">

            <img src="/logo.png" className='2xl:w-16 2xl:h-16 sm:w-14 sm:h-14 w-8 h-8  bg-white rounded-r-md p-0.5 sm:mt-2 2xl:mt-4' />
            <div className="w-full flex px-1 rounded-md border-gray-500">
              <div className="w-full ml-4 flex justify-end items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white hover:bg-gray-300 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-4 w-4 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 text-red-600 " aria-hidden="true" onClick={() => setOpen(!open)} />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="bg-white flex max-w-xs items-center rounded-full sm:text-sm text-xs focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-300">
                      {store?.user?.photo_url != ""
                        ? <img
                          className="h-6 w-6 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8  rounded-full"
                          src={store?.user?.photo_url}
                          alt=""
                        />
                        :
                        <span className="inline-flex h-6 w-6 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8  items-center justify-center rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white">{store.user.name[0].toUpperCase() || "A"}</span>
                        </span>
                      }
                      <span className="2xl:ml-6 ml-4 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>{store?.user?.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-1 hidden h-6 w-6 flex-shrink-0 text-gray-400 lg:block"
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
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 sm:text-sm text-xs text-gray-700 w-full text-left')}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => store.logout()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 sm:text-sm text-xs text-gray-700 w-full text-left')}
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
            
          </div>
          </div>
          <main className="flex-1  max-w-full overflow-hidden 2xl:-mt-30 sm:-mt-28 -mt-32">
            <div className='mx-auto 2xl:px-10 px-1 sm:px-6  '>
            <div className=" brelative  overflow-x-hidden max-w-full bg-white rounded-md ">
              <Outlet />
            </div>
            </div>
          
          </main>
         
        </div>
      </div>
    </>
  )
}