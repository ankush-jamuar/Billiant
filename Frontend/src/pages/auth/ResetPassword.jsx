import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../layouts/AuthLayout";
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
    if (!password) return toast.error("Password required");

    try {
      setLoading(true);
      await api.post("/api/auth/reset-password", { token, password });
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
        <h2 className="text-3xl font-semibold">Reset password</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Reset password"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
