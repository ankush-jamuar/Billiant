import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const InvoiceTable = ({ invoices }) => {
  const navigate = useNavigate();

  // 🔍 SEARCH EMPTY STATE ONLY
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h3 className="text-base font-semibold text-slate-900">
          No matching invoices
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try a different keyword or clear the search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            <th className="px-6 py-3">Invoice</th>
            <th className="px-6 py-3">Client</th>
            <th className="px-6 py-3 text-right">Amount</th>
            <th className="px-6 py-3 text-center">Status</th>
            <th className="px-6 py-3">Due Date</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv, idx) => (
            <tr
              key={inv._id}
              onClick={() => navigate(`/invoices/${inv._id}`)}
              className={`
                cursor-pointer
                border-b last:border-b-0
                transition
                hover:bg-indigo-50/40
                ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}
              `}
            >
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">
                    {inv.invoiceNumber}
                  </span>
                  <span className="text-xs text-slate-500">
                    #{inv._id.slice(-6)}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-slate-700">
                  {inv.clientId?.name || "—"}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-slate-900">
                  ₹{inv.total}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={inv.status} />
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-slate-600">
                  {inv.dueDate
                    ? new Date(inv.dueDate).toLocaleDateString("en-IN")
                    : "—"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
