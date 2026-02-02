import Button from "../../components/ui/Button";

const AccountSection = () => {
  return (
    <div className="max-w-3xl rounded-2xl bg-white border p-6">
      <h2 className="text-lg font-semibold text-red-600">
        Danger zone
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        These actions are irreversible
      </p>

      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
        <h3 className="font-medium text-red-700">Delete account</h3>
        <p className="mt-1 text-sm text-red-600 p-2">
          This will permanently delete your account and all data.
        </p>

        <Button
          className="mt-4 bg-red-600 hover:bg-red-700 text-white"
        >
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default AccountSection;
