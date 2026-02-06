import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { changePassword } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

const SecuritySection = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword) {
      return toast.error("All fields are required");
    }

    if (form.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated. Please login again.");

      // 🔒 Force logout after password change
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl rounded-2xl border bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Change password
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Choose a strong password you haven’t used before
      </p>

      <div className="mt-6 space-y-4">
        <Input
          label="Current password"
          name="currentPassword"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
        />

        <Input
          label="New password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
        />

        <Input
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <Button
          loading={loading}
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Update password
        </Button>
      </div>
    </div>
  );
};

export default SecuritySection;
