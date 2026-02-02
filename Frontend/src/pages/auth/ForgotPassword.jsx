import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import api from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/auth/forgot-password", { email });
      toast.success("If the email exists, a reset link was sent");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="mb-2 text-3xl font-semibold">Forgot password</h2>
        <p className="mb-6 text-sm text-slate-600">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button loading={loading} className="w-full">
            Send reset link
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
