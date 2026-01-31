import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../layouts/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await loginApi({ email, password });
      login(res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#0F172A]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to manage your invoices
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-xs text-slate-500 hover:text-indigo-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition-all"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-500">Secure login</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-xs text-slate-500">
            🔒 Your data is encrypted and never shared
          </p>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Create one
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
