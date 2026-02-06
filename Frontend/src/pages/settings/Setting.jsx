import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMe } from "../../services/auth.services";

import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import DangerZone from "./DangerZone";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data.data))
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading settings…</div>;
  }

  return (
    <div className="max-w-4xl space-y-12">
      <ProfileSection user={user} onUserUpdate={setUser} />
      <SecuritySection />
      <DangerZone />
    </div>
  );
};

export default Settings;
