'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from '../../../lib/api';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';
import { FileText, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function PublicForm({ params }: any) {
  const { publicId } = params;
  const [form, setForm] = useState<any>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/forms/public/${publicId}`)
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Invalid form link');
        setLoading(false);
      });
  }, [publicId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData();
    for (const f of form.fields) {
      const key = f.id;
      const v = values[key];
      if (f.type === 'IMAGE' && files[key]) {
        fd.append(key, files[key]);
      } else {
        fd.append(key, typeof v === 'object' ? JSON.stringify(v) : v ?? '');
      }
    }

    try {
      const res = await fetch(`${API_BASE}/submissions/public/${publicId}`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Submit failed');

      setSubmitted(true);
      toast.success('Form submitted successfully! 🎉');
    } catch (err) {
      toast.error('Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading form...</p>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Form Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This form link is invalid or has been deleted.
          </p>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="max-w-md w-full text-center animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Your response has been submitted successfully.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setValues({});
                setFiles({});
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8" />
              <h1 className="text-3xl font-bold">{form.title}</h1>
            </div>
            {form.description && (
              <p className="text-blue-100 text-lg">{form.description}</p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={submit} className="p-8 space-y-6">
            {form.fields.map((f: any, idx: number) => (
              <div
                key={f.id}
                className="space-y-2 animate-slideIn"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {f.label}
                  {f.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {f.type === 'TEXT' && (
                  <input
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    required={f.required}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, [f.id]: e.target.value }))
                    }
                  />
                )}

                {f.type === 'NUMBER' && (
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    required={f.required}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, [f.id]: Number(e.target.value) }))
                    }
                  />
                )}

                {f.type === 'TEXTAREA' && (
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all resize-y min-h-[120px]"
                    required={f.required}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, [f.id]: e.target.value }))
                    }
                  />
                )}

                {f.type === 'RADIO' && (
                  <div className="space-y-2">
                    {(f.options || []).map((opt: string) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={f.id}
                          value={opt}
                          required={f.required}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          onChange={() => setValues((p) => ({ ...p, [f.id]: opt }))}
                        />
                        <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {f.type === 'CHECKBOX' && (
                  <div className="space-y-2">
                    {(f.options || []).map((opt: string) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          onChange={(e) =>
                            setValues((p) => ({
                              ...p,
                              [f.id]: (p[f.id] || []).includes(opt)
                                ? (p[f.id] || []).filter((x: string) => x !== opt)
                                : [...(p[f.id] || []), opt],
                            }))
                          }
                        />
                        <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {f.type === 'IMAGE' && (
                  <input
                    type="file"
                    accept="image/*"
                    required={f.required}
                    className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 cursor-pointer"
                    onChange={(e) =>
                      e.target.files &&
                      setFiles((p) => ({ ...p, [f.id]: e.target.files![0] }))
                    }
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Form
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>Powered by Daynt Forms ✨</p>
        </div>
      </div>
    </main>
  );
}
