import { useState, useEffect } from 'react';
import dashboardData from '../data/dashboardData.json';

export interface DashboardStats {
  activeCards: {
    value: number;
    change: number;
    changeType: 'positive' | 'negative';
    period: string;
  };
  personalizedCards: {
    value: number;
    change: number;
    changeType: 'positive' | 'negative';
    period: string;
  };
  todayRevenue: {
    value: number;
    currency: string;
    change: number;
    changeType: 'positive' | 'negative';
    period: string;
  };
  pendingRequests: {
    value: number;
    requiresAttention: boolean;
  };
}

export interface MonthlyIssuance {
  months: string[];
  personalizedData: number[];
  instantData: number[];
}

export interface WeeklyIncome {
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
    status: string;
    percentage: number;
    color: string;
  }[];
}

export interface DashboardData {
  stats: DashboardStats;
  monthlyIssuance: MonthlyIssuance;
  weeklyIncome: WeeklyIncome;
  cardRequests: CardRequest[];
  cardStatus: CardStatus;
}

export function useStats() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call
    try {
      // Simulate API delay
      const timer = setTimeout(() => {
        setData({
          stats: dashboardData.stats as DashboardStats,
          monthlyIssuance: dashboardData.monthlyIssuance,
          weeklyIncome: dashboardData.weeklyIncome,
          cardRequests: dashboardData.cardRequests,
          cardStatus: dashboardData.cardStatus
        });
        setLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } catch {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}

// Additional hooks for specific chart data
export function useMonthlyIssuance() {
  const [data, setData] = useState<MonthlyIssuance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dashboardData.monthlyIssuance);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useWeeklyIncome() {
  const [data, setData] = useState<WeeklyIncome | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dashboardData.weeklyIncome);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useCardStatus() {
  const [data, setData] = useState<CardStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dashboardData.cardStatus);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}