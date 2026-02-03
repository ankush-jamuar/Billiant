import { Mail, AlertTriangle } from "lucide-react";
import { resendVerification } from "../../services/auth.services";
import toast from "react-hot-toast";
import { useState } from "react";

const EmailVerificationBanner = ({ user }) => {
  const [loading, setLoading] = useState(false);

  if (!user || user.isEmailVerified) return null;

  const handleResend = async () => {
    try {
      setLoading(true);
      await resendVerification();
      toast.success("Verification email sent");
    } catch (err) {
      toast.error("Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div
        className="
          mx-auto
          max-w-7xl
          rounded-xl
          border border-amber-200
          bg-amber-50
          px-6 py-4
        "
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-900">
                Verify your email address
              </p>
              <p className="mt-0.5 text-sm text-amber-800">
                You need to verify your email to send invoices and receive payments.
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleResend}
            disabled={loading}
            className="
              inline-flex items-center gap-2
              rounded-lg
              bg-amber-600
              px-4 py-2
              text-sm font-medium text-white
              hover:bg-amber-700
              disabled:opacity-60
              transition
            "
          >
            <Mail size={16} />
            {loading ? "Sending…" : "Resend verification"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
