import React, { useState, type FC, type ReactNode } from "react";
import Header from "./Header";
import type { MenuItem } from "../../types";
import dashboardData from "../../data/dashboardData.json";
import Sidebar from "./Sidebar";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>(dashboardData.menu[0]);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeMenu={activeMenu} />
        <main className="flex-1 overflow-y-auto p-[20px] pt-[8px] scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
};

export default React.memo(DashboardLayout)