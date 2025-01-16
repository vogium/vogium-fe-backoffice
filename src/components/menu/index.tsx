import { useMenu, useNavigation } from "@refinedev/core";
import { TreeMenuItem } from "@refinedev/core/dist/hooks/menu/useMenu";
import React from "react";
import { useTranslate } from "@refinedev/core";

export const Menu = () => {
  const translate = useTranslate();
  const { menuItems } = useMenu();
  const { list } = useNavigation();
  const [openMenuItemsIndexes, setOpenMenuItemsIndexes] = React.useState<
    number[]
  >([]);

  const handleClick = (index: number) => {
    if (openMenuItemsIndexes.includes(index)) {
      setOpenMenuItemsIndexes(
        openMenuItemsIndexes.filter((item) => item !== index)
      );
    } else {
      setOpenMenuItemsIndexes([...openMenuItemsIndexes, index]);
    }
  };

  const getChildMenuItems = (item: TreeMenuItem) => {
    return item.children.map((child, childIndex) => (
      <button
        key={childIndex}
        onClick={(e) => {
          list(child.name || "/");
        }}
        className="flex items-center w-full px-1 py-2 leading-tight transition-all rounded-lg outline-none text-start border-0 bg-transparent hover:bg-gray-100"
      >
        <img
          src={(child.icon as string) || "/icons/stockIcon.svg"}
          alt=""
          className="w-5 h-5 mr-2 ml-2"
        />
        <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
          {translate("resources." + child.label + ".name")}
        </p>
      </button>
    ));
  };

  const getMenuItem = (item: TreeMenuItem, index: number) => {
    return (
      <div key={item.key}>
        <button
          onClick={() => {
            if (item.children.length > 0) {
              handleClick(index);
            } else {
              list(item.name || "/");
            }
          }}
          className="rounded flex items-center justify-between w-full p-3 text-xl font-semibold leading-snug text-left border-0 bg-transparent hover:bg-brand/20"
        >
          <img
            src={(item.icon as string) || "/icons/stockIcon.svg"}
            alt=""
            className="w-5 h-5 mr-2 ml-2"
          />

          <p className="block mr-auto text-base font-normal leading-relaxed">
            {translate("resources." + item.label + ".name")}
          </p>

          {item.children.length > 0 && (
            <img
              src="/icons/arrowDown.svg"
              className={`ml-4 w-5 h-5 transition-transform ${
                openMenuItemsIndexes.includes(index) ? "rotate-180" : ""
              }`}
            ></img>
          )}
        </button>
        {item.children.length > 0 && openMenuItemsIndexes.includes(index) && (
          <div className="relative">
            <div className="absolute left-9 h-[87%] top-2 w-0.5 rounded bg-gray-400"></div>
            <div className="ml-11 overflow-hidden">
              <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                {getChildMenuItems(item)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full max-w-[18rem] flex-col rounded-br-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <div className="sticky top-0 ">
          <div className="p-4">
            <img
              src="/logoPrimary.png"
              className="w-full object-contain max-h-12"
              style={{
                userSelect: "none",
              }}
            />
          </div>

          <hr className="my-2 border-blue-gray-50" />

          <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
            {/* {getMenuItem(menuItems[0], 0)} */}
            {menuItems.map((item, index) => getMenuItem(item, index))}

            {/* <hr className="my-2 border-blue-gray-50" /> */}

            {/* <div
            role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            Inbox
            <div className="grid ml-auto place-items-center justify-self-end">
              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                <span className="">14</span>
              </div>
            </div>
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            Profile
          </div> */}
          </nav>
        </div>
      </div>
    </>
  );

  // return (
  //   <nav className="menu">
  //     <ul>
  //       {menuItems.map((item) => (
  //         <li key={item.key}>
  //           <NavLink to={item.route ?? "/"}>{item.label}</NavLink>
  //         </li>
  //       ))}
  //     </ul>
  //     <button onClick={() => logout()}>Logout</button>
  //   </nav>
  // );
};
