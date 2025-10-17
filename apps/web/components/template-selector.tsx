'use client';
import { useState } from 'react';
import { formTemplates, TemplateType } from '@/lib/templates';
import { 
  MessageSquare, Users, ClipboardList, Mail, 
  Briefcase, Calendar, X, Sparkles, FileText
} from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (template: TemplateType, data: any) => void;
  onClose: () => void;
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const templates = [
    { 
      id: 'feedback' as TemplateType, 
      name: 'Customer Feedback', 
      icon: MessageSquare, 
      color: 'from-blue-500 to-blue-600',
      description: 'Collect customer feedback and satisfaction ratings'
    },
    { 
      id: 'registration' as TemplateType, 
      name: 'Event Registration', 
      icon: Users, 
      color: 'from-purple-500 to-purple-600',
      description: 'Register attendees for events and conferences'
    },
    { 
      id: 'survey' as TemplateType, 
      name: 'Survey', 
      icon: ClipboardList, 
      color: 'from-green-500 to-green-600',
      description: 'Create surveys to understand your audience'
    },
    { 
      id: 'contact' as TemplateType, 
      name: 'Contact Form', 
      icon: Mail, 
      color: 'from-orange-500 to-orange-600',
      description: 'Simple contact form for inquiries'
    },
    { 
      id: 'jobApplication' as TemplateType, 
      name: 'Job Application', 
      icon: Briefcase, 
      color: 'from-indigo-500 to-indigo-600',
      description: 'Accept job applications with file uploads'
    },
    { 
      id: 'rsvp' as TemplateType, 
      name: 'RSVP', 
      icon: Calendar, 
      color: 'from-pink-500 to-pink-600',
      description: 'Event RSVP with guest count'
    },
  ];

  const handleSelect = (templateId: TemplateType) => {
    const template = formTemplates[templateId];
    onSelect(templateId, template);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose a Template</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start with a pre-built form template</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Blank Template */}
            <button
              onClick={onClose}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left"
            >
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Blank Form
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start from scratch with a blank form
              </p>
            </button>

            {/* Template Cards */}
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => handleSelect(template.id)}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
