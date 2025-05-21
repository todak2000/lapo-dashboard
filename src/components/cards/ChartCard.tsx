import { Maximize2 } from "lucide-react";
import type { ReactNode } from "react";
import React from "react";

const ChartCard = ({ title, chart }: { title: string; chart: ReactNode }) => {
  return (
    <div className="bg-white p-[16px] rounded-[12px] border-[1px] border-[#E2E2E2]">
      <div className="flex justify-between items-center mb-[22px]">
        <h2 className="text-[18px] font-[500] text-[#121212]">{title}</h2>
        <button className="text-[#D0D5DD] cursor-pointer hover:opacity-60">
          <Maximize2 size={14} />
        </button>
      </div>
      <div className={`h-[250px] ${title ==="Recent Card Requests"?"w-full":"max-w-[500px] mx-auto"}`}>{chart}</div>
    </div>
  );
};

export default React.memo(ChartCard)
