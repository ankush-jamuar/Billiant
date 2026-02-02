const SecuritySection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Security
      </h2>

      <div className="mt-6 space-y-4">
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
          Change password
        </button>

        <p className="text-xs text-slate-500">
          You’ll be redirected to reset password
        </p>
      </div>
    </div>
  );
};

export default SecuritySection;
