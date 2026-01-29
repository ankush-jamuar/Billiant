import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const InvoiceTable = ({ invoices }) => {
  const navigate = useNavigate();

  if (invoices.length === 0) {
    return (
      <div className="rounded border p-6 text-center text-gray-600">
        No invoices yet. Create your first invoice.
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-left">
          <th className="py-2">Invoice</th>
          <th>Client</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Due Date</th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((inv) => (
          <tr
            key={inv._id}
            onClick={() => navigate(`/invoices/${inv._id}`)}
            className="cursor-pointer border-b hover:bg-gray-50"
          >
            <td className="py-2 font-medium">{inv.invoiceNumber}</td>
            <td>{inv.clientId?.name}</td>
            <td>₹{inv.total}</td>
            <td>
              <StatusBadge status={inv.status} />
            </td>
            <td>
              {new Date(inv.dueDate).toLocaleDateString("en-IN")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
