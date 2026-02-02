import { useState } from "react";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import AccountSection from "./AccountSection";
import { User, Shield, Settings } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "account", label: "Account", icon: Settings },
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* Page heading (Topbar already exists, so subtle) */}
      <div className="mb-8">
        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences and security
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
                transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-6xl">
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "security" && <SecuritySection />}
        {activeTab === "account" && <AccountSection />}
      </div>
    </div>
  );
};

export default Setting;
