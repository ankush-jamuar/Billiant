import { FileText, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
        <Sparkles className="h-7 w-7 text-indigo-600" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-slate-900">
        Welcome to Billiant
      </h2>

      {/* Subtitle */}
      <p className="mt-2 max-w-md text-sm text-slate-600">
        Your dashboard will show revenue, invoice status, and client insights.
        Let’s get started by creating your first client or invoice.
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/clients")}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Users size={16} />
          Add Client
        </button>

        <button
          onClick={() => navigate("/invoices/new")}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FileText size={16} />
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export default DashboardEmptyState;
