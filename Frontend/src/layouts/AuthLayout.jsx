const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
          
          {/* LEFT — BRAND STORY */}
          <div className="hidden lg:flex flex-col justify-between p-12 text-white">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Billiant
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Invoicing, done right
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Beautiful invoices.
                <br />
                Faster payments.
              </h2>
              <p className="mt-4 max-w-sm text-white/70">
                Send professional invoices, track payments, and manage clients
                — all from one clean dashboard.
              </p>
            </div>

            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Billiant
            </p>
          </div>

          {/* RIGHT — FORM */}
          <div className="p-8 sm:p-12 bg-white/90 rounded-3xl lg:rounded-l-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
