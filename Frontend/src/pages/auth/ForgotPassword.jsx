import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../layouts/AuthLayout";
import toast from "react-hot-toast";
import api from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email required");

    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", { email });
      toast.success("Reset link sent if account exists");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-3xl font-semibold">Forgot password</h2>
        <p className="mt-2 text-sm text-slate-600">
          We’ll send you a reset link
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
