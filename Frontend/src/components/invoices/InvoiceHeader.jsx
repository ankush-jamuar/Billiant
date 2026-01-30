import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import {
  updateInvoiceStatus,
  downloadInvoicePdf,
  sendInvoice,
} from "../../services/invoice.service";

const InvoiceHeader = ({ invoice, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDownloadPdf = async () => {
    try {
      const pdfBlob = await downloadInvoicePdf(invoice._id);

      const url = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF");
    }
  };

  const handleSend = async () => {
  try {
    setLoading(true);
    await sendInvoice(invoice._id);   // 🔥 THIS
    onStatusChange();                 // refresh invoice
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

      // ✅ defensive call
      onStatusChange?.();
    } catch (err) {
      console.error("Mark paid failed", err);
      alert("Failed to mark invoice as paid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-between rounded bg-white p-6 shadow-sm">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold">
          Invoice {invoice.invoiceNumber}
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Client: {invoice.clientId?.name}
        </p>

        <p className="text-sm text-gray-600">
          Due: {new Date(invoice.dueDate).toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <StatusBadge status={invoice.status} />

        {invoice.status === "draft" && (
          <>
            <button
              onClick={() => navigate(`/invoices/${invoice._id}/edit`)}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300"
            >
              Edit
            </button>

            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Invoice"}
            </button>
          </>
        )}

        {invoice.status === "sent" && (
          <button
            onClick={handleMarkPaid}
            disabled={loading}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Mark as Paid"}
          </button>
        )}
        {invoice.status !== "draft" && (
          <button
            onClick={handleDownloadPdf}
            className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-800 hover:bg-gray-200"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceHeader;
