import React, { type FC } from "react";
import type { MenuItem } from "../../types";
import { getIcon } from "../../utils/iconUtil";
import { CircleUserIcon, NotificationIcon, SearchIcon } from "../icons";

interface HeaderProps {
  activeMenu: MenuItem;
}
const Header: FC<HeaderProps> = ({ activeMenu }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-[12px] py-[10px]">
        <div className="text-[#001735] flex gap-[12px]">
          {getIcon(activeMenu.icon)}
          <p className="text-[12px] leading-[18px]">{activeMenu.title}</p>
        </div>

        <div className="flex items-center space-x-4 hover:opacity-80">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-[13px] flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-[37px] pr-4 py-[7px] border  text-[11px] border-[#D0D5DD] rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="relative p-2 pointer-cursor text-gray-500 hover:text-gray-700 transition-colors">
            <NotificationIcon />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 pointer-cursor border border-[#DEDEDF] flex flex-col items-center justify-center text-[#475467] bg-[#F2F4F7] size-[32px] rounded-full transition-colors">
            <CircleUserIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header)