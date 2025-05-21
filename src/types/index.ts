export interface User {
  name: string;
  lastLogin: string;
  date: string;
}

export interface QuickAccessItem {
  id: number;
  title: string;
  icon: string;
  link: string;
}

export interface StatItem {
  value: number;
  change?: number;
  period?: string;
  currency?: string;
  requiresAttention?: boolean;
}

export interface StatsData {
  activeCards: StatItem;
  personalizedCards: StatItem;
  todayRevenue: StatItem;
  pendingRequests: StatItem;
}

export interface ChartData {
  months: string[];
  personalized: number[];
  instant: number[];
}

export interface LineChartData {
  days: string[];
  values: number[];
}

export interface CardRequest {
  id: number;
  branch: string;
  cardType: string;
  quantity: number;
  status: string;
}

export interface CardStatus {
  total: number;
  distribution: {
    [key: string]: number;
  };
}

export interface MenuItem {
  id: number;
  title: string;
  icon: string;
  link: string;
}

export interface DashboardData {
  user: User;
  quickAccess: QuickAccessItem[];
  stats: StatsData;
  monthlyIssuance: ChartData;
  weeklyIncome: LineChartData;
  cardRequests: CardRequest[];
  cardStatus: CardStatus;
  menu: MenuItem[];
}