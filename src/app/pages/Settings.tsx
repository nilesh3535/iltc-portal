import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Toggle } from "../components/ui/Toggle";
import { Save } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const [settings, setSettings] = useState({
    appName: "ILTC Travels",
    appLogo: "",
    maxFileSize: "10",
    allowedFileTypes: "pdf,doc,docx,xls,xlsx,jpg,png",
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    autoArchiveCompletedTours: true,
    defaultChatEnabled: true,
    defaultBroadcastEnabled: true,
    requireInviteApproval: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl text-gray-800">System Settings</h3>
        <p className="text-sm text-gray-600 mt-1">
          Configure application preferences and default behaviors
        </p>
      </div>

      {/* App Branding */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">App Branding</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Application Name"
              value={settings.appName}
              onChange={(e) =>
                setSettings({ ...settings, appName: e.target.value })
              }
              placeholder="Enter app name"
            />
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                App Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛫</span>
                </div>
                <Button variant="secondary">Upload Logo</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Settings */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">File Upload Settings</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Maximum File Size (MB)"
              type="number"
              value={settings.maxFileSize}
              onChange={(e) =>
                setSettings({ ...settings, maxFileSize: e.target.value })
              }
            />
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Allowed File Types
              </label>
              <textarea
                value={settings.allowedFileTypes}
                onChange={(e) =>
                  setSettings({ ...settings, allowedFileTypes: e.target.value })
                }
                placeholder="Enter file types separated by commas"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: pdf, doc, docx, xls, xlsx, jpg, png
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Notification Preferences</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-600 mt-1">
                  Send email notifications for important events
                </p>
              </div>
              <Toggle
                enabled={settings.emailNotifications}
                onChange={(enabled) =>
                  setSettings({ ...settings, emailNotifications: enabled })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">SMS Notifications</p>
                <p className="text-xs text-gray-600 mt-1">
                  Send SMS notifications to travellers
                </p>
              </div>
              <Toggle
                enabled={settings.smsNotifications}
                onChange={(enabled) =>
                  setSettings({ ...settings, smsNotifications: enabled })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Push Notifications</p>
                <p className="text-xs text-gray-600 mt-1">
                  Send push notifications to mobile app users
                </p>
              </div>
              <Toggle
                enabled={settings.pushNotifications}
                onChange={(enabled) =>
                  setSettings({ ...settings, pushNotifications: enabled })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Permissions */}
      <Card>
        <CardHeader>
          <h4 className="text-lg text-gray-800">Default Tour Settings</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">
                  Group Chat Enabled by Default
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Enable group chat for newly created tours
                </p>
              </div>
              <Toggle
                enabled={settings.defaultChatEnabled}
                onChange={(enabled) =>
                  setSettings({ ...settings, defaultChatEnabled: enabled })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">
                  Broadcast Enabled by Default
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Enable broadcast messaging for newly created tours
                </p>
              </div>
              <Toggle
                enabled={settings.defaultBroadcastEnabled}
                onChange={(enabled) =>
                  setSettings({ ...settings, defaultBroadcastEnabled: enabled })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">
                  Auto-Archive Completed Tours
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Automatically archive tours after completion date
                </p>
              </div>
              <Toggle
                enabled={settings.autoArchiveCompletedTours}
                onChange={(enabled) =>
                  setSettings({
                    ...settings,
                    autoArchiveCompletedTours: enabled,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Require Invite Approval</p>
                <p className="text-xs text-gray-600 mt-1">
                  Travellers must be approved before joining
                </p>
              </div>
              <Toggle
                enabled={settings.requireInviteApproval}
                onChange={(enabled) =>
                  setSettings({ ...settings, requireInviteApproval: enabled })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save size={18} className="mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
