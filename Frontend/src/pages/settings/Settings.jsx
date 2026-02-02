import { useState } from "react";
import {
  User,
  Shield,
  LogOut,
} from "lucide-react";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import AccountSection from "./AccountSection";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "account", label: "Account", icon: LogOut },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-slate-900 mb-8">
        Settings
      </h1>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <section className="flex-1 rounded-2xl border bg-white p-8 shadow-sm">
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "security" && <SecuritySection />}
          {activeTab === "account" && <AccountSection />}
        </section>
      </div>
    </div>
  );
};

export default Settings;
