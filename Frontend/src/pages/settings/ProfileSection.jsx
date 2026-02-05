import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { updateMe } from "../../services/auth.services";

const ProfileSection = ({ user, onUserUpdate }) => {
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await updateMe({ name });

      toast.success("Profile updated successfully");
      onUserUpdate(res.data.data); // 🔁 update global state
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* MAIN */}
      <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Personal information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          This information appears on invoices and emails
        </p>

        <div className="mt-6 space-y-5">
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            value={user.email}
            readOnly
          />

          <Button
            type="button"
            loading={saving}
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Save changes
          </Button>
        </div>
      </div>

      {/* SIDE */}
      <div className="rounded-2xl border bg-slate-50 p-6">
        <h3 className="text-sm font-semibold text-slate-700">
          Profile status
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>
            {user.isEmailVerified ? "✔" : "⚠"} Email verified
          </li>
          <li>✔ Account active</li>
          <li>
            📅 Member since{" "}
            {new Date(user.createdAt).getFullYear()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSection;
