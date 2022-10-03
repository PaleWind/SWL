import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import SideBar from "./SideBar";
import MyIcons from "./MyIcons";

export default function Layout({ title, children, landing }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [open, setOpen] = useState(false);
  const index = landing === "1";
  //console.log(landing);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  function EditInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#fee2e2"
          stroke="#f87171"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function EditActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#f87171"
          stroke="#ffffff"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function DuplicateInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H12V12H4V4Z"
          fill="#fee2e2"
          stroke="#f87171"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#fee2e2"
          stroke="#f87171"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function DuplicateActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H12V12H4V4Z"
          fill="#f87171"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#f87171"
          stroke="#ffffff"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function ArchiveInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#fee2e2"
          stroke="#f87171"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#fee2e2"
          stroke="#f87171"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    );
  }

  function ArchiveActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#f87171"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#f87171"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    );
  }

  function CartIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    );
  }

  function UserIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    );
  }

  function LoginIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-0 h-5 "
      ></svg>
    );
  }
  function SideBarIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          fill="#f87171"
          //stroke="#dc2626"
          stroke="#6b7280"
        />
      </svg>
    );
  }

  return (
    <>
      <Head>
        <title>
          {title ? title + " - Shadow Work Lighting" : "Shadow Work Lighting"}
        </title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <SideBar open={open} setOpen={() => setOpen(false)}></SideBar>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <button onClick={() => setOpen(true)}>
              <SideBarIcon />
            </button>
            <Link href="/">
              <a className="flex text-lg text-red-600 font-bold animate-pulse hover:text-gray-500">
                <p className="">Shadow Work&nbsp;</p>
                <p className=" hidden md:block">Lighting</p>
              </a>
            </Link>
            <div>
              <a href="/cart" className="group">
                {cartItemsCount > 0 && (
                  <span className="relative left-3 bottom-3 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
                <button className=" px-3 shadow-xl inline-flex justify-center rounded-full bg-gray-900 bg-opacity-90 py-2 text-sm font-light text-white group-hover:bg-opacity-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <div className=" text-white group-hover:text-white">
                    {" "}
                    <CartIcon className="px-2 h-3 w-3" aria-hidden="true" />
                  </div>
                </button>
              </a>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="px-2 m-1 shadow-xl inline-flex w-full justify-center rounded-full bg-gray-900 bg-opacity-90 py-2 text-sm font-light text-white hover:bg-opacity-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <UserIcon className="h-3 w-3" aria-hidden="true" />
                    <p className="px-1">{session.user.name}</p>
                  </Menu.Button>
                  <Transition
                    //as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  ></Transition>
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-200 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <EditActiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <EditInactiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            <Link href="/profile">
                              <p className="text-black">Profile</p>
                            </Link>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-200 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <ArchiveActiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArchiveInactiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            <Link href="/order-history">
                              <p className="text-black">Order History</p>
                            </Link>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      {session.user.isAdmin && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-200 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <EditActiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EditInactiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              <Link href="/admin/dashboard">
                                <p className="text-black">Admin Dashboard</p>
                              </Link>
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-gray-200 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <DuplicateActiveIcon
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <DuplicateInactiveIcon
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          )}

                          <a
                            className="text-black"
                            href="#"
                            onClick={logoutClickHandler}
                          >
                            Logout
                          </a>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <button className="m-1 px-3 shadow-xl inline-flex justify-center rounded-full bg-gray-900 bg-opacity-90 py-2 text-sm font-light text-white hover:bg-opacity-50 transition-all transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <LoginIcon className="" aria-hidden="true" />
                  <Link href="/login">
                    <a className=" px-1 text-white hover:text-white">Login</a>
                  </Link>
                </button>

                // <Link href="/login">
                //   <a className="p-2 text-black">Login</a>
                // </Link>
              )}
            </div>
          </nav>
        </header>

        <main
          className={`container ${index ? "min-w-full" : "m-auto mt-4 px-4"} `}
        >
          {children}
        </main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Shadow Work Lighting</p>
        </footer>
      </div>
    </>
  );
}
