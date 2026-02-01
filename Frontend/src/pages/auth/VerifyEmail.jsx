import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/auth.services";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid verification link");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setSuccess(true);
        toast.success("Email verified successfully 🎉");

        // Auto redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Verification link is invalid or expired"
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <AuthLayout>
      <div className="text-center">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <p className="text-sm text-slate-600">
              Verifying your email address…
            </p>
          </div>
        )}

        {/* Success */}
        {!loading && success && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Email verified
            </h2>
            <p className="text-sm text-slate-600">
              Redirecting you to dashboard…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <h2 className="text-xl font-semibold text-slate-900">
              Verification failed
            </h2>
            <p className="text-sm text-slate-600">{error}</p>

            <Button
              disabled
              className="mt-4 rounded-xl px-6 py-2 opacity-60"
            >
              Resend verification (coming soon)
            </Button>

            <button
              onClick={() => navigate("/login")}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              Back to login
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
