'use client';

import { BarChart, TrendingUp, Users, FileText } from 'lucide-react';

interface FormAnalyticsProps {
  totalForms: number;
  totalSubmissions: number;
  recentActivity: number;
}

export function FormAnalytics({ totalForms, totalSubmissions, recentActivity }: FormAnalyticsProps) {
  const stats = [
    {
      label: 'Total Forms',
      value: totalForms,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Total Responses',
      value: totalSubmissions,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Avg. Responses/Form',
      value: totalForms > 0 ? Math.round((totalSubmissions / totalForms) * 10) / 10 : 0,
      icon: BarChart,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Recent Activity',
      value: recentActivity,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
