const ProfileSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Profile
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Manage your personal information
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            disabled
            value="Your name"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            disabled
            value="you@email.com"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
