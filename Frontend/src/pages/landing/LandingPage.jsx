import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-[#0F172A] text-white">
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

      {/* NAVBAR */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Billiant
          </h1>
          <p className="text-xs text-white/60">
            Invoicing, done right
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-medium text-white/80 hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex h-[calc(100vh-72px)] items-center px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT — COPY */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/80">
              <Zap size={14} className="text-indigo-400" />
              Built for freelancers & founders
            </div>

            <h2 className="text-[52px] font-semibold leading-tight tracking-tight">
              Invoicing that
              <br />
              works as hard as you do
            </h2>

            <p className="mt-5 max-w-lg text-white/70">
              Create polished invoices, track payments, and manage clients
              from one focused, beautifully designed workspace.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Start free
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/login"
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                Already have an account?
              </Link>
            </div>

            <div className="my-8 h-px w-24 bg-white/20" />

            <div className="flex gap-8 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-indigo-400" />
                Free to start
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-indigo-400" />
                Secure & private
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-indigo-400" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* RIGHT — POLISHED UI */}
          <div className="relative flex justify-center items-center">

            {/* Main invoice */}
            <div className="relative z-20 w-[420px] rounded-3xl bg-white/95 backdrop-blur-xl p-7 text-slate-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Invoice
                  </p>
                  <p className="text-lg font-semibold tracking-tight">
                    #INV-3012
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Paid
                </span>
              </div>

              <div className="my-5 h-px bg-slate-200/70" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-700">
                  <span>Brand design</span>
                  <span className="font-medium">₹15,000</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Website build</span>
                  <span className="font-medium">₹35,000</span>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-200/70" />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Context card */}
            <div className="absolute -left-24 top-16 z-10 w-60 rounded-2xl bg-white/80 backdrop-blur-lg p-4 text-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
              <p className="text-xs text-slate-500">Client</p>
              <p className="font-semibold">Acme Studio</p>

              <div className="mt-3">
                <p className="text-xs text-slate-500">
                  Last payment received
                </p>
                <p className="text-sm font-semibold text-emerald-600">
                  ₹50,000
                </p>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-indigo-600/30 blur-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
