'use client';
import { API_BASE } from '../../lib/api';

export default function TestEnv() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Environment Test
        </h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">API_BASE from code:</p>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm break-all">
              {API_BASE}
            </code>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">NEXT_PUBLIC_API_BASE from env:</p>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm break-all">
              {process.env.NEXT_PUBLIC_API_BASE || 'NOT SET'}
            </code>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected:</p>
            <code className="block bg-green-100 dark:bg-green-900 p-3 rounded text-sm break-all">
              https://daynt-form-api.onrender.com/api
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
