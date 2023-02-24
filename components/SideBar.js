import { FaInfo, FaHome, FaStoreAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const SideBar = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="top-12 pointer-events-none fixed inset-y-0 left-0 flex max-w-50 w-20 pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="fixed left-0 h-screen w-16 flex flex-col bg-white shadow-lg border">
                    <SideBarLink
                      icon={<FaHome size="28" />}
                      link="/"
                      text="Home"
                    />
                    <Divider />
                    <SideBarLink
                      icon={<FaStoreAlt size="20" />}
                      link="/shop"
                      text="Store"
                    />
                    <SideBarLink
                      icon={<CgProfile size="32" />}
                      link="/profile"
                      text="Profile"
                    />
                    <SideBarLink
                      icon={<FaInfo size="20" />}
                      link="/demos"
                      text="About"
                    />
                    <Divider />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const SideBarIcon = ({ icon, text, link }) => (
  <div className="sidebar-icon group">
    <Link className="z-50" href={link}>
      {icon}
    </Link>
    <span class="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const SideBarLink = ({ icon, link, text = "text" }) => {
  return (
    <Link href={link}>
      <a className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </a>
    </Link>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
