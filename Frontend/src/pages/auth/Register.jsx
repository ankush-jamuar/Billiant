import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthLayout from "../../layouts/AuthLayout";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await registerApi({ name, email, password });

      // 🔑 CRITICAL FIX
      login(res.data.data.token);

      toast.success("Account created successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Start managing invoices professionally
          </p>
        </div>

        {/* Inline error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
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
              className="absolute right-4 top-9 text-slate-400 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-[11px] text-slate-500">
            🔒 Secure signup · Email verification required
          </p>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
