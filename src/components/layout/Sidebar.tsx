import { useState, useCallback, useMemo, memo, type FC } from "react";
import dashboardData from "../../data/dashboardData.json";
import type { MenuItem } from "../../types";
import { getIcon } from "../../utils/iconUtil";
import { LogoutIcon } from "../icons";

const lapoLogo = "/logo.png";
const cardInfo = "/cardinfo.png";

interface SideBarProps {
  activeMenu: MenuItem;
  setActiveMenu: React.Dispatch<React.SetStateAction<MenuItem>>;
}

const SidebarComponent: FC<SideBarProps> = ({ activeMenu, setActiveMenu }) => {
  const [activeItem, setActiveItem] = useState<string>("/");

  const menuItems = useMemo(() => {
    return (dashboardData.menu as MenuItem[]).filter(
      (item) => item.title !== activeMenu.title
    );
  }, [activeMenu.title]);

  const handleMenuClick = useCallback(
    (link: string) => {
      setActiveItem(link);
    },
    [setActiveItem]
  );

  return (
    <div className="w-[230px] bg-[#002F6C] text-white h-screen flex-col hidden md:flex">
      <div className="pt-[27px] pl-[10px] pb-[31px]">
        <img src={lapoLogo} alt="LAPO Logo" className="h-[45px]" />
      </div>

      <div className="pl-[11px] pr-[13px] pb-[16px]">
        <span
          className={`flex items-center font-[500] rounded-[8px] py-[10px] pl-[12px] text-[12px] leading-[18px] hover:opacity-60 bg-[#E4F0FF] text-[#014DAF]`}
        >
          <span className="mr-3 text-[#014DAF]">
            {getIcon(activeMenu.icon)}
          </span>
          {activeMenu.title}
        </span>
        <p className="text-[8.5px] pl-[16px] leading-[18px] pt-[17px] text-[#7E8B9C] font-[500]">
          MAIN MENU
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hide">
        <ul className="pl-[11px] pr-[13px] pb-[16px]">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.link);
                  setActiveMenu(item);
                }}
                className={`flex items-center font-[400] py-[10px] pl-[12px] leading-[18px] text-[12px] hover:opacity-60 ${
                  activeItem === item.link
                    ? "bg-[#E4F0FF] text-[#014DAF]"
                    : "text-[#D0D5DD]"
                }`}
              >
                <span className="mr-3">{getIcon(item.icon)}</span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 mb-[44px] pt-4">
        <button className="flex text-white cursor-pointer hover:opacity-60 items-center text-sm hover:text-gray-300 transition-colors gap-3">
          <LogoutIcon />
          <span className="text-[12px] leading-[18px]">Logout</span>
        </button>
      </div>

      <div className="mt-auto px-5">
        <p className="text-[8.5px] pl-[16px] leading-[18px] pt-[17px] text-[#7E8B9C] font-[500]">
          POWERED BY
        </p>
        <img
          src={cardInfo}
          alt="cardInfo Logo"
          className="h-[41px] mb-[30px]"
        />
      </div>
    </div>
  );
};

export default memo(SidebarComponent);
