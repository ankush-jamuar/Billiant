import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { updateInvoiceStatus } from "../../services/invoice.service";
import { useState } from "react";

const InvoiceHeader = ({ invoice, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      setLoading(true);
      await updateInvoiceStatus(invoice._id, "sent");
      onStatusChange(); // refresh invoice
    } catch (err) {
      alert("Failed to send invoice");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async () => {
    try {
      setLoading(true);
      await updateInvoiceStatus(invoice._id, "paid");
      onStatusChange(); // refresh invoice
    } catch (err) {
      alert("Failed to mark invoice as paid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-start rounded bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">
          Invoice {invoice.invoiceNumber}
        </h1>
        <p className="text-sm text-gray-600">
          Client: {invoice.clientId?.name}
        </p>
        <p className="text-sm text-gray-600">
          Due: {new Date(invoice.dueDate).toLocaleDateString("en-IN")}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={invoice.status} />

        {invoice.status === "draft" && (
          <>
            <button
              onClick={() => navigate(`/invoices/${invoice._id}/edit`)}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-800"
            >
              Edit
            </button>

            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Invoice"}
            </button>
          </>
        )}

        {invoice.status === "sent" && (
          <button
            onClick={handleMarkPaid}
            disabled={loading}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white disabled:opacity-60"
          >
            {loading ? "Updating..." : "Mark as Paid"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceHeader;
