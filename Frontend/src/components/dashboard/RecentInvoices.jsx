import { useNavigate } from "react-router-dom";
import StatusBadge from "../invoices/StatusBadge";

const RecentInvoices = ({ invoices }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 min-h-[64px]">
        <h3 className="text-base font-semibold text-slate-900">
          Recent Invoices
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Quick access to your latest invoices
        </p>
      </div>

      {/* Content */}
      <div className="divide-y divide-slate-100">
        {invoices.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No invoices yet
          </div>
        ) : (
          invoices.map((invoice) => (
            <button
              key={invoice._id}
              onClick={() => navigate(`/invoices/${invoice._id}`)}
              className="
                w-full px-5 py-4 text-left
                flex items-center justify-between
                hover:bg-slate-50
                transition-colors
              "
            >
              {/* Left */}
              <div>
                <p className="font-medium text-slate-900">
                  {invoice.invoiceNumber}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {invoice.clientId?.name}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <StatusBadge invoice={invoice} />

                <span className="text-sm font-medium text-slate-900">
                  ₹{invoice.total}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentInvoices;
