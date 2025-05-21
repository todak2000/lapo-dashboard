import React from "react";
import { getCardStatusColor } from "../../utils/formatters";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TableChart = ({ data }: { data: Record<string, any> }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="min-w-full">
        <thead>
          <tr className="text-left  text-black/60 tracking-wider border-y-[1px] border-y-[#E2E2E2]">
            {["Branch", "Card Type", "Quantity", "Status", "Action"].map(
              (i) => {
                return (
                  <th
                    key={i}
                    className="px-[35px] py-[8px] leading-[18px] text-[12px] font-[500] bg-[#F1F7FF] text-center"
                  >
                    {i}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#EAECF0]">
          {data?.map((request: Record<string, any>) => (
            <tr key={request.id}>
              <td className="px-[32px] text-center py-[11px] whitespace-nowrap text-[10px] leading-[20px] font-[400] text-[#475467]">
                {request.branch}
              </td>
              <td className="px-[32px] text-center py-[11px] whitespace-nowrap text-[10px] leading-[20px] font-[400] text-[#475467]">
                {request.cardType}
              </td>
              <td className="px-[32px] text-center py-[11px] whitespace-nowrap text-[10px] leading-[20px] font-[400] text-[#475467]">
                {request.quantity}
              </td>
              <td className="px-[32px] text-center py-[11px] whitespace-nowrap text-[10px] leading-[20px] font-[400] text-[#475467]">
                <span
                  className={`px-[8px] py-[2px] text-[10px] leading-[18px] font-[500] rounded-full ${getCardStatusColor(request.status)}`}
                >
                  {request.status}
                </span>
              </td>
              <td className="px-[32px] text-center py-[11px] whitespace-nowrap text-[10px] leading-[20px] font-[700] text-[#014DAF]">
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default React.memo(TableChart);
