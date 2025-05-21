import React from "react";
import { ChevronRightIcon, ManageCardIcon } from "../icons";

// Define props interface
interface QuickAccessItemProps {
  id: number;
  title: string;
  icon: React.ReactNode; 
  link?: string;
}

const QuickAccessSection: React.FC = () => {
  const title = "Your Quick Access";
  const quickAccessItems: QuickAccessItemProps[] = [
    {
      id: 1,
      title: "Manage a Card",
      icon: <ManageCardIcon />,
      link: "/manage",
    },
    {
      id: 2,
      title: "Issue Instant Card",
      icon: <ManageCardIcon />,
      link: "/issue-instant",
    },
    {
      id: 3,
      title: "Issue Personalized Card",
      icon: <ManageCardIcon />,
      link: "/issue-personalized",
    },
    {
      id: 4,
      title: "Review Card Requests",
      icon: <ManageCardIcon />,
      link: "/review",
    },
  ];
  return (
    <div className="mt-[13px] p-[16px] border-[1px] border-[#E2E2E2] rounded-[10px]">
      <h2 className="text-[16px] leading-[18px] font-[500] mb-[13px]">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {quickAccessItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#F1F7FF] px-[16px] max-w-[290px] py-[9px] rounded-[4px] transition-shadow cursor-pointer flex items-center"
          >
            <div className="flex text-white items-center justify-center size-[28px] bg-[#014DAF] rounded-full ">
              <ManageCardIcon />
            </div>
            <span className="font-[500] text-[14px] leading-[18px] ml-[16px] mr-[5px]">
              {item.title}
            </span>
            <span className="text-[#808080]">
              {" "}
              <ChevronRightIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(QuickAccessSection);
