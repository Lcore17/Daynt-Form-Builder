'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_BASE } from '../../lib/api';
import { ThemeToggle } from '@/components/theme-toggle';
import { ResponseVisualization } from '@/components/response-visualization';
import { Download, ArrowLeft, FileText, Calendar, BarChart3 } from 'lucide-react';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

export default function Responses() {
  const [formId, setFormId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showVisualization, setShowVisualization] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    setFormId(params.get('formId'));
  }, []);

  const { data: submissions } = useSWR(formId ? `${API_BASE}/submissions/form/${formId}` : null, fetcher);
  const { data: formData } = useSWR(formId ? `${API_BASE}/forms/${formId}` : null, fetcher);
  
  const download = (type: 'csv' | 'json') => {
    if (formId) {
      window.open(`${API_BASE}/submissions/export/${formId}/${type}`, '_blank');
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  if (!formId) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Missing Form ID</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please select a form to view responses</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="p-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Form Responses
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {(submissions || []).length} response{(submissions || []).length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowVisualization(!showVisualization)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all border border-purple-200 dark:border-purple-800 text-sm sm:text-base"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden xs:inline">Analytics</span>
              </button>
              <button
                onClick={() => download('csv')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all border border-green-200 dark:border-green-800 text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                <span className="hidden xs:inline">CSV</span>
              </button>
              <button
                onClick={() => download('json')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all border border-blue-200 dark:border-blue-800 text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                <span className="hidden xs:inline">JSON</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Visualization */}
        {showVisualization && submissions && submissions.length > 0 && formData && (
          <div className="mb-8">
            <ResponseVisualization 
              responses={submissions} 
              fields={formData.fields || []} 
            />
          </div>
        )}

        {!submissions ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 sm:p-12 text-center">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Responses Yet
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Share your form to start collecting responses
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {submissions.map((s: any, index: number) => (
              <div
                key={s.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold">
                      #{index + 1}
                    </span>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(s.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                  <pre className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-96 custom-scrollbar">
                    {JSON.stringify(s.answers, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
