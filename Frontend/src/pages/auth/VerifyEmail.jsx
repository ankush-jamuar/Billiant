import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/api/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    if (token) verify();
    else setStatus("error");
  }, [token]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-6 rounded-xl border text-center">
        {status === "loading" && <p>Verifying email...</p>}

        {status === "success" && (
          <>
            <h1 className="text-xl font-semibold mb-2">
              Email Verified 🎉
            </h1>
            <p className="mb-4 text-gray-600">
              Your email has been verified successfully.
            </p>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:underline"
            >
              Go to Dashboard
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold mb-2 text-red-600">
              Verification Failed
            </h1>
            <p className="text-gray-600">
              Invalid or expired verification link.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
