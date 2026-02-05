import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMe } from "../../services/auth.services";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ProfileSection from "./ProfileSection";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Security
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- Change password ---------------- */
  const handleChangePassword = () => {
    if (!password || password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast("Password update API will be wired next", { icon: "🔒" });
  };

  /* ---------------- Delete account ---------------- */
  const handleDeleteAccount = () => {
    if (!confirm("This action is permanent. Delete account?")) return;

    toast("Delete account API will be wired last", { icon: "⚠️" });
  };

  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Loading settings…
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10">
      {/* ---------- PROFILE ---------- */}
      <ProfileSection user={user} onUserUpdate={setUser} />

      {/* ---------- SECURITY ---------- */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Security
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Change your password
        </p>

        <div className="mt-6 space-y-5 max-w-md">
          <Input
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            onClick={handleChangePassword}
            className="bg-indigo-600 hover:bg-indigo-700"
            type="button"
          >
            Update password
          </Button>
        </div>
      </section>

      {/* ---------- DANGER ZONE ---------- */}
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Danger zone
        </h2>
        <p className="mt-1 text-sm text-red-600">
          Permanently delete your account and all data
        </p>

        <div className="mt-6">
          <Button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700"
            type="button"
          >
            Delete account permanently
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
