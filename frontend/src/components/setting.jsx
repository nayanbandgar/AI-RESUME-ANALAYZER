import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    analysisAlerts: true,
    darkMode: false,
    autoAnalyze: false,
  });

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: "emailNotifications", label: "Email notifications", desc: "Receive updates about analysis results via email" },
    { key: "analysisAlerts", label: "Analysis alerts", desc: "Get notified when resume analysis is complete" },
    { key: "darkMode", label: "Dark mode", desc: "Switch to dark theme across the app" },
    { key: "autoAnalyze", label: "Auto analyze", desc: "Automatically analyze resumes after upload" },
  ];

  return (
    <div className="max-w-xl mx-auto">

      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your app preferences.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-4">
        {items.map((item, i) => (
          <div
            key={item.key}
            className={`flex items-center justify-between px-5 py-4 ${
              i !== items.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ml-4 ${
                settings[item.key] ? "bg-gray-900" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings[item.key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-red-100 rounded-xl p-5">
        <p className="text-sm font-medium text-red-500 mb-1">Danger zone</p>
        <p className="text-xs text-gray-400 mb-3">This will permanently delete your account and all data.</p>
        <button className="px-4 py-2 border border-red-200 text-red-500 text-sm rounded-lg hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}