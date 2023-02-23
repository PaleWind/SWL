import { AiOutlineShop, AiOutlineCloseCircle } from "react-icons/ai";

import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaInfo, FaHome, FaStoreAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const SideBar = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        {/* <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child> */}

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* <div className="top-12 pointer-events-none fixed inset-y-0 left-0 flex max-w-50 w-20 pr-10"> */}
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                {/* <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    ></button>
                  </div>
                </Transition.Child> */}

                <div className="fixed left-0 h-screen w-16 flex flex-col bg-white shadow-lg border">
                  <SideBarIcon
                    icon={<FaHome size="28" />}
                    link="/"
                    text="Home"
                  ></SideBarIcon>
                  <Divider />
                  <SideBarIcon
                    icon={<FaStoreAlt size="20" />}
                    link="/shop"
                    text="Store"
                  />
                  <SideBarIcon
                    icon={<CgProfile size="32" />}
                    link="/profile"
                    text="Profile"
                  />
                  <SideBarIcon
                    icon={<FaInfo size="20" />}
                    link="/demos"
                    text="About"
                  />
                  <Divider />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            {/* </div> */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    // <div
    //   className="fixed top-12 left-0 h-screen w-16 flex flex-col
    //               bg-white shadow-lg border"
    // >
    // <SideBarIcon
    //   icon={<FaHome size="28" />}
    //   link="/"
    //   text="Home"
    // ></SideBarIcon>
    // <Divider />
    // <SideBarIcon icon={<FaStoreAlt size="20" />} link="/shop" text="Store" />
    // <SideBarIcon
    //   icon={<CgProfile size="32" />}
    //   link="/profile"
    //   text="Profile"
    // />
    // <SideBarIcon icon={<FaInfo size="20" />} link="/demos" text="About" />
    // <Divider />
    // </div>
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

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;

// export default function SideBar({ open, setOpen }) {
//   //const [open, setOpen] = useState(true);
//   return (
// <Transition.Root show={open} as={Fragment}>
//   <Dialog as="div" className="relative z-10" onClose={setOpen}>
//     <Transition.Child
//       as={Fragment}
//       enter="ease-in-out duration-500"
//       enterFrom="opacity-0"
//       enterTo="opacity-100"
//       leave="ease-in-out duration-500"
//       leaveFrom="opacity-100"
//       leaveTo="opacity-0"
//     >
//       <div className="fixed inset-0 transition-opacity" />
//     </Transition.Child>

//     <div className="fixed inset-0 overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-50 w-20 pr-10">
//           <Transition.Child
//             as={Fragment}
//             enter="transform transition ease-in-out duration-500 sm:duration-700"
//             enterFrom="-translate-x-full"
//             enterTo="translate-x-0"
//             leave="transform transition ease-in-out duration-500 sm:duration-700"
//             leaveFrom="translate-x-0"
//             leaveTo="-translate-x-full"
//           >
//             <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-in-out duration-500"
//                 enterFrom="opacity-0"
//                 enterTo="opacity-100"
//                 leave="ease-in-out duration-500"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
//                   <button
//                     type="button"
//                     className="rounded-md text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
//                     onClick={() => setOpen(false)}
//                   >
//                     <span className="sr-only">Close panel</span>
//                     <AiOutlineCloseCircle size="32" />
//                   </button>
//                 </div>
//               </Transition.Child>

//               {/* <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
//                 <div className="px-4 sm:px-6">
//                   <Dialog.Title className="text-lg font-medium text-gray-900 inline-flex">
//                     Panel title
//                   </Dialog.Title>
//                 </div>
//               </div> */}
//               {/* <div className="relative mt-6 flex-1 px-4 sm:px-6"></div> */}
//               <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg">

//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </div>
//     </div>
//   </Dialog>
// </Transition.Root>
//   );
// }
