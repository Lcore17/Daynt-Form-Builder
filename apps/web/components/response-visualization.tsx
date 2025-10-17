'use client';
import { BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';

interface ResponseVisualizationProps {
  responses: any[];
  fields: any[];
}

export function ResponseVisualization({ responses, fields }: ResponseVisualizationProps) {
  // Calculate statistics for each field
  const getFieldStats = (field: any) => {
    const fieldAnswers = responses
      .flatMap(r => r.answers)
      .filter(a => a.fieldId === field.id);

    if (field.type === 'RADIO' || field.type === 'CHECKBOX') {
      // Count occurrences of each option
      const counts: Record<string, number> = {};
      fieldAnswers.forEach(answer => {
        const value = answer.value;
        if (value) {
          const values = field.type === 'CHECKBOX' ? value.split(',') : [value];
          values.forEach((v: string) => {
            counts[v] = (counts[v] || 0) + 1;
          });
        }
      });
      return counts;
    }

    if (field.type === 'NUMBER') {
      const numbers = fieldAnswers.map(a => parseFloat(a.value)).filter(n => !isNaN(n));
      if (numbers.length === 0) return null;
      const sum = numbers.reduce((a, b) => a + b, 0);
      const avg = sum / numbers.length;
      const min = Math.min(...numbers);
      const max = Math.max(...numbers);
      return { avg, min, max, count: numbers.length };
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <Users className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{responses.length}</div>
          <div className="text-sm opacity-90">Total Responses</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{fields.length}</div>
          <div className="text-sm opacity-90">Form Fields</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <BarChart3 className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">
            {responses.length > 0 ? Math.round((responses.filter(r => !r.isDraft).length / responses.length) * 100) : 0}%
          </div>
          <div className="text-sm opacity-90">Completion Rate</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <PieChart className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">
            {responses.length > 0 && responses[0].completionTime 
              ? Math.round(responses.reduce((sum, r) => sum + (r.completionTime || 0), 0) / responses.length) 
              : 0}s
          </div>
          <div className="text-sm opacity-90">Avg. Time</div>
        </div>
      </div>

      {/* Field-by-Field Analysis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Response Breakdown
        </h3>

        {fields.map(field => {
          const stats = getFieldStats(field);
          if (!stats) return null;

          if (typeof stats === 'object' && 'avg' in stats) {
            // Number field
            return (
              <div key={field.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{field.label}</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.avg.toFixed(1)}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Average</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.min}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Minimum</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.max}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Maximum</div>
                  </div>
                </div>
              </div>
            );
          }

          // Radio/Checkbox field
          const total = Object.values(stats).reduce((a: any, b: any) => a + b, 0) as number;
          return (
            <div key={field.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">{field.label}</h4>
              <div className="space-y-2">
                {Object.entries(stats).map(([option, count]: [string, any]) => {
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  return (
                    <div key={option}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
