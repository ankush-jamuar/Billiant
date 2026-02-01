import { useState } from "react";
import toast from "react-hot-toast";
import { resendVerification } from "../../services/auth.services";

const EmailVerificationBanner = ({ user }) => {
  const [loading, setLoading] = useState(false);

  if (!user || user.isEmailVerified) return null;

  const handleResend = async () => {
    try {
      setLoading(true);
      await resendVerification();
      toast.success("Verification email sent 📧");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to resend email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-yellow-800">
          Verify your email address
        </p>
        <p className="text-sm text-yellow-700">
          Please verify your email to unlock all features.
        </p>
      </div>

      <button
        onClick={handleResend}
        disabled={loading}
        className="rounded-lg bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Resend email"}
      </button>
    </div>
  );
};

export default EmailVerificationBanner;
