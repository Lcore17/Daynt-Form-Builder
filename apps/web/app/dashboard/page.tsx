'use client';
import useSWR from 'swr';
import { API_BASE } from '../../lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';
import { FormAnalytics } from '@/components/form-analytics';
import { 
  Plus, Edit, ExternalLink, Copy, Trash2, BarChart3, 
  Eye, LogOut, Settings, Search
} from 'lucide-react';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

export default function Dashboard() {
  const { data, mutate } = useSWR(`${API_BASE}/forms`, fetcher);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (data?.statusCode === 401) window.location.href = '/login';
  }, [data]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { 
        method: 'POST', 
        credentials: 'include' 
      });
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (e) {
      toast.error('Logout failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/forms/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!res.ok) throw new Error('Delete failed');
      
      toast.success('Form deleted successfully');
      mutate();
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete form');
    }
  };

  const copyFormLink = (publicId: string) => {
    const link = `${window.location.origin}/form/${publicId}`;
    navigator.clipboard.writeText(link);
    toast.success('Public link copied! 📋');
  };

  const forms = Array.isArray(data) ? data : [];
  const filteredForms = forms.filter((f: any) => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.description && f.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalSubmissions = forms.reduce((acc: number, f: any) => acc + (f._count?.submissions || 0), 0);
  const recentActivity = forms.filter((f: any) => {
    const created = new Date(f.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created > weekAgo;
  }).length;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Daynt Forms
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Manage your forms and responses
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => window.location.href = '/builder'}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline">New Form</span>
                <span className="xs:hidden">New</span>
              </button>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Analytics */}
        <FormAnalytics 
          totalForms={forms.length}
          totalSubmissions={totalSubmissions}
          recentActivity={recentActivity}
        />

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Forms Grid */}
        <div className="space-y-4">
          {filteredForms.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 sm:p-12 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {searchQuery ? 'No forms found' : 'No forms yet'}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery 
                  ? 'Try adjusting your search query' 
                  : 'Create your first form to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => window.location.href = '/builder'}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Form
                </button>
              )}
            </div>
          ) : (
            filteredForms.map((f: any) => (
              <div
                key={f.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {f.title}
                      </h3>
                      {f.isPublic && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded flex-shrink-0">
                          Public
                        </span>
                      )}
                    </div>
                    {f.description && (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {f.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {f._count?.submissions || 0} responses
                      </span>
                      <span className="hidden xs:inline">
                        Created {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => window.location.href = `/builder?id=${f.id}`}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                      title="Edit form"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => window.location.href = `/responses?formId=${f.id}`}
                      className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg transition-colors"
                      title="View responses"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => window.open(`/form/${f.publicId}`, '_blank')}
                      className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg transition-colors"
                      title="Preview form"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => copyFormLink(f.publicId)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
                      title="Copy public link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                      title="Delete form"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
