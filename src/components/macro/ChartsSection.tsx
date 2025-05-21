import React from "react";
import { useStats } from "../../hooks/useStats";
import ChartCard from "../cards/ChartCard";
import BarChart from "../charts/BarChart";
import DonutChart from "../charts/DonutChart";
import LineChart from "../charts/LineChart";
import TableChart from "../charts/TableChart";

const ChartSection = () => {
  const { data } = useStats();

  const arr = [
    {
      title: "Monthly Issuance",
      chart: data?.monthlyIssuance ? (
        <BarChart data={data.monthlyIssuance} height={200} />
      ) : null,
    },
    {
      title: "Recent Card Requests",
      chart: data?.cardRequests ? (
        <TableChart data={data?.cardRequests} />
      ) : null,
    },
  ];

  const arr2 = [
    {
      title: "This Week's Income",
      chart: data?.weeklyIncome ? (
        <LineChart data={data.weeklyIncome} height={200} />
      ) : null,
    },
    {
      title: "Card Status Distribution",
      chart: data?.cardStatus ? (
        <DonutChart data={data.cardStatus} height={200} width={200} />
      ) : null,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {arr.map((i) => {
          return <ChartCard {...i} key={i.title} />;
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {arr2.map((i) => {
          return <ChartCard {...i} key={i.title} />;
        })}
      </div>
    </>
  );
};
export default React.memo(ChartSection);
