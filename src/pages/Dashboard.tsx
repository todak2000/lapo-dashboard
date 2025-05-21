import { type FC } from "react";
import { useStats } from "../hooks/useStats";
import dashboardData from "../data/dashboardData.json";

import DashboardHeader from "../components/macro/DashboardHeader";
import QuickAccessSection from "../components/macro/QuickAccessSection";
import AnalyticsSection from "../components/macro/Analytics";
import ChartSection from "../components/macro/ChartsSection";

const Dashboard: FC = () => {
  const { loading } = useStats();
  const { user } = dashboardData;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <DashboardHeader user={user} />

      {/* Quick Access Cards */}
      <QuickAccessSection />

      {/* Analytics Section */}
      <AnalyticsSection />

      {/* Charts */}
      <ChartSection />
    </div>
  );
};

export default Dashboard;
