import { Calendar } from "lucide-react";
import React from "react";

interface DashboardHeaderProps {
  user: {
    name: string;
    lastLogin: string;
    date: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="flex justify-between items-center">
      {/* Greeting Section */}
      <div>
        <h1 className="text-[14px] md:text-[18px] leading-[24px] font-[700] text-[#121212]">
          Hi {user.name}, what would you like to do today?
        </h1>
        <p className="text-[#121212] text-[12px] my-[6px]">
          <span className="font-[500]">Last login: </span>
          <span className="font-[400]">{user.lastLogin}</span>
        </p>
      </div>

      {/* Date Info Section */}
      <div className="hidden md:flex items-center bg-transparent px-4 py-2 rounded border border-[#D0D5DD] text-[11px]">
        <Calendar size={16} color="#121212" className="mr-[2px]" />
        <span className="font-[500] border-r pr-[6px] border-[#D0D5DD]">
          Today
        </span>
        <span className="font-[400] ml-[6px]">{user.date}</span>
      </div>
    </div>
  );
};

export default React.memo(DashboardHeader);
