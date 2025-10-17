'use client';

import { useState } from 'react';
import { FileText, CheckSquare, Type, Hash, Calendar, Upload, Eye, EyeOff } from 'lucide-react';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface LiveFormPreviewProps {
  fields: FormField[];
  formTitle?: string;
  formDescription?: string;
}

export function LiveFormPreview({ fields, formTitle = 'Untitled Form', formDescription }: LiveFormPreviewProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [previewData, setPreviewData] = useState<Record<string, any>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setPreviewData(prev => ({ ...prev, [fieldId]: value }));
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
        return <Type className="w-4 h-4" />;
      case 'textarea':
        return <FileText className="w-4 h-4" />;
      case 'number':
        return <Hash className="w-4 h-4" />;
      case 'select':
      case 'radio':
        return <CheckSquare className="w-4 h-4" />;
      case 'date':
        return <Calendar className="w-4 h-4" />;
      case 'file':
        return <Upload className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const renderField = (field: FormField) => {
    const baseInputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={`${baseInputClass} min-h-[100px] resize-y`}
            placeholder={`Enter ${field.label.toLowerCase()}...`}
            required={field.required}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      
      case 'select':
        return (
          <select
            className={baseInputClass}
            required={field.required}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          >
            <option value="">Select an option...</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  required={field.required}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{opt}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={opt}
                  onChange={(e) => {
                    const current = previewData[field.id] || [];
                    if (e.target.checked) {
                      handleInputChange(field.id, [...current, opt]);
                    } else {
                      handleInputChange(field.id, current.filter((v: string) => v !== opt));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{opt}</span>
              </label>
            ))}
          </div>
        );
      
      case 'file':
        return (
          <input
            type="file"
            className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 cursor-pointer"
            required={field.required}
            onChange={(e) => handleInputChange(field.id, e.target.files?.[0])}
          />
        );
      
      default:
        return (
          <input
            type={field.type}
            className={baseInputClass}
            placeholder={`Enter ${field.label.toLowerCase()}...`}
            required={field.required}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Live Preview
        </h3>
        <button
          onClick={() => setIsPreviewVisible(!isPreviewVisible)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isPreviewVisible ? (
            <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {isPreviewVisible && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6 animate-fadeIn">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {formTitle || 'Untitled Form'}
            </h2>
            {formDescription && (
              <p className="text-gray-600 dark:text-gray-400">{formDescription}</p>
            )}
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Add fields to see the preview
              </p>
            </div>
          ) : (
            <form className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2 animate-slideIn">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getFieldIcon(field.type)}
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={(e) => e.preventDefault()}
              >
                Submit Form
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
