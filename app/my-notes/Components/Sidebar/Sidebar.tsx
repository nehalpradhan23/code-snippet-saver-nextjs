"use client";
import { useGlobalContext } from "@/Context/ContextApi";
import { useEffect } from "react";

import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiCplusplus } from "react-icons/si";
import useWindowDimensions from "./WindowDimensions";
import { QuickLinks } from "./components/QuickLinks";
import { Languages } from "./components/Languages";

export default function Sidebar() {
  const {
    darkModeObject: { darkMode },
    openSidebarObject: { openSidebar, setOpenSidebar },
  } = useGlobalContext();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (openSidebar) {
      if (width && width > 768) {
        setOpenSidebar(false);
      }
    }
  }, [width]);
  // ====================================================
  return (
    <div
      className={`
        ${openSidebar ? "fixed z-50 shadow-lg" : "max-lg:hidden"}
        pr-5 flex flex-col gap-2 p-6 min-h-screen shadow-lg pt-7 ${
          darkMode[1].isSelected ? "bg-slate-900" : "bg-white"
        }`}
    >
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  );
}

function Logo() {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    // <div className="flex gap-2 items-center">
    <div
      className={`flex gap-2 items-center pointer-events-none ${
        darkMode[1].isSelected ? "text-white" : "text-slate-600"
      }`}
    >
      <span className="font-extrabold text-3xl">{"{"}</span>
      <div className="flex gap-1 text-[23px]">
        <span className={`font-bold text-mainColor`}>Code</span>
        <span className="">Board</span>
      </div>
      <span className="font-extrabold  text-3xl">{"}"}</span>
    </div>
  );
}

// function QuickLinks() {
//   const {
//     sideBarMenuObject: { sideBarMenu, setSideBarMenu },
//     openSidebarObject: { openSidebar, setOpenSidebar },
//   } = useGlobalContext();

//   function clickedMenu(index: number) {
//     if (openSidebar) setOpenSidebar(false);
//     const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
//       if (i === index) {
//         return { ...menu, isSelected: true };
//       } else {
//         return { ...menu, isSelected: false };
//       }
//     });
//     setSideBarMenu(updatedSideBarMenu);
//   }

//   return (
//     <div className="mt-20 text-sm">
//       <div className="font-bold text-slate-400">Links</div>
//       <ul className="text-slate-400 mt-4 flex flex-col gap-2">
//         {sideBarMenu.map((menu, index) => (
//           <li
//             key={index}
//             onClick={() => clickedMenu(index)}
//             className={`flex cursor-pointer select-none gap-1 items-center p-[7px] px-2 w-[80%] rounded-md
//             ${menu.isSelected ? "bg-blue-400 text-white" : "text-slate-400"}
//               `}
//           >
//             {menu.icons}
//             <span>{menu.name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
