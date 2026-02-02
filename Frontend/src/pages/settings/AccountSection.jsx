const AccountSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Account
      </h2>

      <div className="mt-6">
        <button className="rounded-xl border px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountSection;
