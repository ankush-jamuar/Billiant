import StatusBadge from "../invoices/StatusBadge";
import { useNavigate } from "react-router-dom";

const RecentInvoices = ({ invoices }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded bg-white p-4 shadow-sm">
      <h2 className="mb-4 font-medium">Recent Invoices</h2>

      {invoices.length === 0 ? (
        <p className="text-sm text-gray-500">
          No invoices created yet.
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Invoice</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv._id}
                className="cursor-pointer border-b hover:bg-gray-50"
                onClick={() => navigate(`/invoices/${inv._id}`)}
              >
                <td className="py-2 font-medium">
                  {inv.invoiceNumber}
                </td>
                <td>{inv.clientName}</td>
                <td>₹{inv.total}</td>
                <td>
                  <StatusBadge status={inv.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentInvoices;
