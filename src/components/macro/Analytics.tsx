import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useStats } from "../../hooks/useStats";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  getChangeColor,
} from "../../utils/formatters";
import {
  InfoIcon,
  PendingIcon,
  ProfileIcon,
  RequestIcon,
  RevenueIcon,
} from "../icons";
import React from "react";

const AnalyticsSection: React.FC = () => {
  const title = "Analytics";
  const { data } = useStats();
  const analyticsArr = [
    {
      icon: <RequestIcon />,
      title: "Total Active Cards",
      value: data?.stats.activeCards.value,
      direction: data?.stats.activeCards.changeType,
      change: data?.stats.activeCards.change,
      period: data?.stats.activeCards.period,
      color: "text-[#00984C]",
    },
    {
      icon: <ProfileIcon />,
      title: "Total Personalized Cards",
      value: data?.stats.personalizedCards.value,
      direction: data?.stats.personalizedCards.changeType,
      change: data?.stats.personalizedCards.change,
      period: data?.stats.personalizedCards.period,
      color: "text-[#8020E7]",
    },
    {
      icon: <RevenueIcon />,
      title: "Today's Revenue",
      value: data?.stats.todayRevenue.value,
      direction: data?.stats.todayRevenue.changeType,
      change: data?.stats.todayRevenue.change,
      period: data?.stats.todayRevenue.period,
      currency: data?.stats.todayRevenue.currency,
      color: "text-[#2087E7]",
    },
    {
      icon: <PendingIcon />,
      title: "Pending Requests",
      value: data?.stats.pendingRequests.value,

      period: "Requires attention",
      color: "text-[#E78020]",
    },
  ];
  return (
    <div className="mt-[11px] mb-[8px]">
      <h1 className="text-[18px] leading-[27px] font-[700] text-[#121212] mt-[11px] mb-[10px]">
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Active Cards */}
        {analyticsArr.map((i) => {
          return (
            <div key={i.title} className="bg-white xl:max-w-[290px] h-[110px] px-[11px] pt-[12px] pb-[17px] rounded-[10px] border-[1px] border-[#E2E2E2]">
              <div className="flex justify-between items-start">
                <div className={`flex ${i.color} size-[16px]`}>{i.icon}</div>
              </div>
              <div className="mt-[4px]">
                <h3 className="text-[14px] font-[500] mb-[11px] leading-[18px] text-black/50">
                  {i.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[24px] font-[700] text-[#121212]">
                    {i.currency
                      ? formatCurrency(i.value || 0, i.currency)
                      : formatNumber(i.value || 0)}
                  </p>
                  <div
                    className={`flex items-center text-[12px] leading-[18px] font-[500] ${i.direction ? "text-black/50" : "text-[#E78020]"}`}
                  >
                    {i.direction ? (
                      <div
                        className={`flex items-center px-1 ${getChangeColor(i.direction || "positive")}`}
                      >
                        {i.direction === "positive" ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        <span>{formatPercentage(i.change || 0)}</span>
                      </div>
                    ) : (
                      <InfoIcon />
                    )}
                    <span className="ml-1 font-[400]">{i.period}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(AnalyticsSection);
