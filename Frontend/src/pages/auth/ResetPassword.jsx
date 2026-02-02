import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import api from "../../services/api";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(`/api/auth/reset-password?token=${token}`, {
        password,
      });

      toast.success("Password reset successful");
      navigate("/login");
    } catch {
      toast.error("Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="mb-2 text-3xl font-semibold">Reset password</h2>
        <p className="mb-6 text-sm text-slate-600">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button loading={loading} className="w-full">
            Reset password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
