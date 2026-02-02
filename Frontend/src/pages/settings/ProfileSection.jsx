import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const ProfileSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main card */}
      <div className="lg:col-span-2 rounded-2xl bg-white border p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Personal information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          This information appears on invoices and emails
        </p>

        <div className="mt-6 space-y-5">
          <Input label="Full name" placeholder="Your name" />
          <Input label="Email" disabled placeholder="you@email.com" />

          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
            Save changes
          </Button>
        </div>
      </div>

      {/* Side card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 border p-6">
        <h3 className="text-sm font-semibold text-slate-700">
          Profile status
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>✔ Email verified</li>
          <li>✔ Account active</li>
          <li>📅 Member since 2025</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSection;
