import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const SecuritySection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl bg-white border p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Change password
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Use a strong password to keep your account secure
        </p>

        <div className="mt-6 space-y-5">
          <Input label="Current password" type="password" />
          <Input label="New password" type="password" />
          <Input label="Confirm password" type="password" />

          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Update password
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 border p-6">
        <h3 className="text-sm font-semibold text-slate-700">
          Security tips
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>🔐 Use at least 8 characters</li>
          <li>🔄 Change password periodically</li>
          <li>🚫 Never share credentials</li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritySection;
