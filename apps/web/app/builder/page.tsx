'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE } from '../../lib/api';
import { LiveFormPreview } from '@/components/live-form-preview';
import { ThemeToggle } from '@/components/theme-toggle';
import { TemplateSelector } from '@/components/template-selector';
import { AdvancedSettings } from '@/components/advanced-settings';
import { 
  Type, Hash, FileText, CheckSquare, Circle, Image, 
  Plus, Save, ArrowLeft, Settings, Trash2, GripVertical, Copy, Link as LinkIcon, Sparkles
} from 'lucide-react';

type Field = { id: string; label: string; type: 'TEXT'|'NUMBER'|'TEXTAREA'|'CHECKBOX'|'RADIO'|'IMAGE'; required?: boolean; order: number; options?: string[]; minLength?: number; maxLength?: number; minValue?: number; maxValue?: number; pattern?: string };

export default function Builder() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const id = params.get('id');
  const [title, setTitle] = useState('New Form');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [fields, setFields] = useState<Field[]>([]);
  const [publicId, setPublicId] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState<any>({});
  
  useEffect(() => {
    if (!id) {
      // Show template selector for new forms
      setShowTemplates(true);
      return;
    }
    fetch(`${API_BASE}/forms/${id}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((f) => {
        setTitle(f.title); 
        setDescription(f.description || ''); 
        setIsPublic(f.isPublic); 
        setFields(f.fields);
        setPublicId(f.publicId || '');
        setAdvancedSettings({
          brandColor: f.brandColor,
          startDate: f.startDate,
          endDate: f.endDate,
          maxSubmissions: f.maxSubmissions,
          thankYouMessage: f.thankYouMessage,
          redirectUrl: f.redirectUrl,
          language: f.language,
          webhookUrl: f.webhookUrl,
          enableCaptcha: f.enableCaptcha,
        });
      });
  }, [id]);

  const fieldTypes = [
    { type: 'TEXT' as const, label: 'Short Text', icon: Type },
    { type: 'NUMBER' as const, label: 'Number', icon: Hash },
    { type: 'TEXTAREA' as const, label: 'Long Text', icon: FileText },
    { type: 'RADIO' as const, label: 'Multiple Choice', icon: Circle },
    { type: 'CHECKBOX' as const, label: 'Checkboxes', icon: CheckSquare },
    { type: 'IMAGE' as const, label: 'File Upload', icon: Image },
  ];

  const addField = (type: Field['type']) => {
    const newField: Field = { 
      id: Math.random().toString(36).slice(2), 
      label: `New ${type.toLowerCase()} field`, 
      type, 
      order: fields.length, 
      required: false,
      options: (type === 'CHECKBOX' || type === 'RADIO') ? ['Option 1', 'Option 2', 'Option 3'] : undefined 
    };
    setFields((prev) => [...prev, newField]);
    toast.success('Field added!');
  };

  const duplicateField = (idx: number) => {
    const field = fields[idx];
    const newField = { ...field, id: Math.random().toString(36).slice(2), order: fields.length };
    setFields((prev) => [...prev, newField]);
    toast.success('Field duplicated!');
  };

  const moveField = (idx: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === fields.length - 1)) return;
    const newFields = [...fields];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newFields[idx], newFields[targetIdx]] = [newFields[targetIdx], newFields[idx]];
    setFields(newFields.map((f, i) => ({ ...f, order: i })));
  };

  const copyPublicLink = () => {
    if (!publicId) return toast.error('Save form first to get public link');
    const link = `${window.location.origin}/form/${publicId}`;
    navigator.clipboard.writeText(link);
    toast.success('Public link copied to clipboard! 📋');
  };

  const handleTemplateSelect = (templateId: string, templateData: any) => {
    setTitle(templateData.title);
    setDescription(templateData.description);
    const mappedFields = templateData.fields.map((f: any) => ({
      ...f,
      id: Math.random().toString(36).slice(2),
      options: f.options ? f.options : undefined
    }));
    setFields(mappedFields);
    setShowTemplates(false);
    toast.success(`${templateData.title} template loaded! 🎉`);
  };

  const save = async () => {
    if (!title.trim()) return toast.error('Form title is required');
    const body = { 
      title, 
      description, 
      isPublic, 
      fields: fields.map(({ id: _id, ...f }) => f),
      ...advancedSettings // Include advanced settings
    };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE}/forms/${id}` : `${API_BASE}/forms`;
    
    try {
      const res = await fetch(url, { 
        method, 
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      });
      
      if (!res.ok) throw new Error('Save failed');
      
      const data = await res.json();
      setPublicId(data.publicId);
      toast.success('Form saved successfully! ✅');
      
      if (!id) {
        setTimeout(() => {
          window.location.href = `/builder?id=${data.id}`;
        }, 1000);
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to save form');
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Template Selector Modal */}
      {showTemplates && (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="p-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {id ? 'Edit Form' : 'Create New Form'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Build your form with live preview
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTemplates(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all border border-purple-200 dark:border-purple-800"
            >
              <Sparkles className="w-4 h-4" />
              Templates
            </button>
            {publicId && (
              <button
                onClick={copyPublicLink}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-200 dark:border-blue-800"
              >
                <LinkIcon className="w-4 h-4" />
                Copy Link
              </button>
            )}
            <button
              onClick={save}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              Save Form
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Form Builder */}
          <div className="space-y-6">
            {/* Form Settings */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold mb-4">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Form Settings
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Form Title *
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Customer Feedback Survey"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Brief description of your form..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Make form publicly accessible
                </span>
              </label>
            </div>

            {/* Field Types */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Add Field
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {fieldTypes.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => addField(type)}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-gray-700 rounded-lg transition-all hover:border-blue-400 dark:hover:border-blue-600 group"
                  >
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <AdvancedSettings 
              settings={advancedSettings} 
              onChange={setAdvancedSettings} 
            />

            {/* Form Fields */}
            <div className="space-y-3">
              {fields.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2">No fields yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Add fields from the options above
                  </p>
                </div>
              ) : (
                fields.map((f, idx) => (
                  <div
                    key={f.id}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col gap-1 pt-2">
                        <button
                          onClick={() => moveField(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 hover:bg-blue-50 dark:hover:bg-gray-800 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </button>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded border border-blue-200 dark:border-blue-800">
                            {f.type}
                          </span>
                          <input
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Field label"
                            value={f.label}
                            onChange={(e) =>
                              setFields((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, label: e.target.value } : x))
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!f.required}
                              onChange={(e) =>
                                setFields((prev) =>
                                  prev.map((x, i) => (i === idx ? { ...x, required: e.target.checked } : x))
                                )
                              }
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Required</span>
                          </label>

                          <button
                            onClick={() => duplicateField(idx)}
                            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Copy className="w-3 h-3" />
                            Duplicate
                          </button>

                          <button
                            onClick={() => {
                              setFields((prev) => prev.filter((_, i) => i !== idx));
                              toast.success('Field removed');
                            }}
                            className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </div>

                        {(f.type === 'RADIO' || f.type === 'CHECKBOX') && (
                          <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Options</p>
                            {(f.options || []).map((opt, oIdx) => (
                              <div key={oIdx} className="flex gap-2 items-center">
                                <input
                                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  value={opt}
                                  onChange={(e) =>
                                    setFields((prev) =>
                                      prev.map((x, i) =>
                                        i === idx
                                          ? { ...x, options: (x.options || []).map((oo, ii) => (ii === oIdx ? e.target.value : oo)) }
                                          : x
                                      )
                                    )
                                  }
                                />
                                <button
                                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                  onClick={() =>
                                    setFields((prev) =>
                                      prev.map((x, i) =>
                                        i === idx ? { ...x, options: (x.options || []).filter((_, ii) => ii !== oIdx) } : x
                                      )
                                    )
                                  }
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                              onClick={() =>
                                setFields((prev) =>
                                  prev.map((x, i) =>
                                    i === idx ? { ...x, options: [...(x.options || []), `Option ${(x.options?.length || 0) + 1}`] } : x
                                  )
                                )
                              }
                            >
                              <Plus className="w-3 h-3" />
                              Add option
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div>
            <LiveFormPreview
              fields={fields.map(f => ({
                ...f,
                type: f.type.toLowerCase() as any,
                required: !!f.required
              }))}
              formTitle={title}
              formDescription={description}
            />
          </div>
run this        </div>
      </div>
    </main>
  );
}
