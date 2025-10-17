'use client';
import { API_BASE } from '../../lib/api';
import { useState } from 'react';

export default function TestEnv() {
  const [testResult, setTestResult] = useState<string>('');
  const [testing, setTesting] = useState(false);
  
  const testConnection = async () => {
    setTesting(true);
    setTestResult('Testing...');
    
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test', password: 'test' })
      });
      
      if (response.status === 401) {
        setTestResult('✅ SUCCESS! API is reachable (401 Unauthorized is expected for bad credentials)');
      } else if (response.status === 404) {
        setTestResult('❌ ERROR: API endpoint not found (404). Wrong URL?');
      } else {
        setTestResult(`⚠️ Unexpected status: ${response.status}`);
      }
    } catch (error: any) {
      setTestResult(`❌ CONNECTION FAILED: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };
  
  const envValue = process.env.NEXT_PUBLIC_API_BASE;
  const isCorrect = envValue === '/api' || envValue === 'https://daynt-form-api.onrender.com/api';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          🔍 Environment Test
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
            <code className={`block p-3 rounded text-sm break-all ${envValue ? 'bg-blue-100 dark:bg-blue-900' : 'bg-red-100 dark:bg-red-900'}`}>
              {envValue || '❌ NOT SET'}
            </code>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected (with rewrite):</p>
            <code className="block bg-green-100 dark:bg-green-900 p-3 rounded text-sm break-all">
              /api
            </code>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              (Or full URL: https://daynt-form-api.onrender.com/api if not using rewrites)
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
            <h2 className="font-bold mb-2 text-lg">
              {isCorrect ? '✅ Environment Variable Correct!' : '❌ Environment Variable Issue'}
            </h2>
            <p className="text-sm">
              {isCorrect 
                ? 'Your environment variable is set correctly. If you\'re still seeing errors, try the connection test below.'
                : 'Your environment variable is not set or incorrect. This is why you\'re getting "failed to fetch" errors.'}
            </p>
          </div>
          
          <div className="border-t pt-4">
            <button
              onClick={testConnection}
              disabled={testing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {testing ? 'Testing Connection...' : '🔗 Test API Connection'}
            </button>
            
            {testResult && (
              <div className={`mt-4 p-4 rounded-lg text-sm ${
                testResult.includes('SUCCESS') 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                  : testResult.includes('FAILED') 
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
              }`}>
                {testResult}
              </div>
            )}
          </div>
          
          {!isCorrect && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">📝 How to Fix:</h3>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Go to <strong>Vercel Dashboard</strong></li>
                <li>Click on your <strong>project</strong></li>
                <li>Go to <strong>Settings</strong> → <strong>Environment Variables</strong></li>
                <li>Find <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">NEXT_PUBLIC_API_BASE</code></li>
                <li>Click <strong>"Edit"</strong> or <strong>"Add New"</strong></li>
                <li>Change Value to: <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/api</code></li>
                <li>Select all environments (Production, Preview, Development)</li>
                <li>Click <strong>"Save"</strong></li>
                <li>Go to <strong>Deployments</strong> → Click latest → ⋯ → <strong>"Redeploy"</strong></li>
                <li>Uncheck <strong>"Use existing Build Cache"</strong></li>
                <li>Wait 2-3 minutes, then refresh this page</li>
              </ol>
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>💡 Why /api?</strong> We added a rewrite in next.config.js that proxies /api/* to your Render backend. 
                  This makes cookies work as first-party cookies, fixing cross-origin auth issues!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
