'use client';
import { useState } from 'react';
import { 
  Settings, Calendar, Users, Palette, Globe, 
  Webhook, Shield, MessageSquare, ChevronDown, ChevronUp
} from 'lucide-react';

interface AdvancedSettingsProps {
  settings: {
    brandColor?: string;
    startDate?: string;
    endDate?: string;
    maxSubmissions?: number;
    thankYouMessage?: string;
    redirectUrl?: string;
    language?: string;
    webhookUrl?: string;
    enableCaptcha?: boolean;
  };
  onChange: (settings: any) => void;
}

export function AdvancedSettings({ settings, onChange }: AdvancedSettingsProps) {
  const [expanded, setExpanded] = useState(false);

  const updateSetting = (key: string, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">Advanced Settings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Customize your form behavior</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {expanded && (
        <div className="p-6 pt-0 space-y-6 border-t border-gray-200 dark:border-gray-800">
          {/* Custom Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Palette className="w-4 h-4" />
              Custom Branding
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-2">
                Brand Color
              </label>
              <input
                type="color"
                value={settings.brandColor || '#2563eb'}
                onChange={(e) => updateSetting('brandColor', e.target.value)}
                className="w-20 h-10 rounded border border-gray-300 dark:border-gray-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Form Scheduling */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              Form Scheduling
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={settings.startDate || ''}
                  onChange={(e) => updateSetting('startDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={settings.endDate || ''}
                  onChange={(e) => updateSetting('endDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Submission Limit */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4" />
              Submission Limit
            </div>
            <input
              type="number"
              placeholder="Unlimited"
              value={settings.maxSubmissions || ''}
              onChange={(e) => updateSetting('maxSubmissions', e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              min="1"
            />
          </div>

          {/* Thank You Message */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <MessageSquare className="w-4 h-4" />
              Thank You Message
            </div>
            <textarea
              placeholder="Thank you for your submission!"
              value={settings.thankYouMessage || ''}
              onChange={(e) => updateSetting('thankYouMessage', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={3}
            />
          </div>

          {/* Redirect URL */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Globe className="w-4 h-4" />
              Redirect After Submission
            </div>
            <input
              type="url"
              placeholder="https://example.com/thank-you"
              value={settings.redirectUrl || ''}
              onChange={(e) => updateSetting('redirectUrl', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Language */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Globe className="w-4 h-4" />
              Language
            </div>
            <select
              value={settings.language || 'en'}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          {/* Webhook Integration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Webhook className="w-4 h-4" />
              Webhook URL
            </div>
            <input
              type="url"
              placeholder="https://hooks.slack.com/..."
              value={settings.webhookUrl || ''}
              onChange={(e) => updateSetting('webhookUrl', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Receive notifications in Slack, Discord, or Zapier
            </p>
          </div>

          {/* CAPTCHA */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Shield className="w-4 h-4" />
                Spam Protection (CAPTCHA)
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableCaptcha || false}
                  onChange={(e) => updateSetting('enableCaptcha', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
