import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StatusBadge from "./StatusBadge";
import {
  updateInvoiceStatus,
  downloadInvoicePdf,
  sendInvoice,
  resendInvoice,
} from "../../services/invoice.service";

const InvoiceHeader = ({ invoice, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleDownloadPdf = async () => {
    try {
      const pdfBlob = await downloadInvoicePdf(invoice._id);

      const url = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download PDF");
    }
  };

  const handleSend = async () => {
    try {
      setSending(true);
      await sendInvoice(invoice._id);

      toast.success("Invoice sent successfully");
      onStatusChange(); // ✅ REQUIRED here
    } catch (err) {
      toast.error("Failed to send invoice");
    } finally {
      setSending(false);
    }
  };

  const handleResend = async () => {
    try {
      setSending(true);
      await resendInvoice(invoice._id);

      toast.success("Invoice email resent");
    } catch (err) {
      console.error("Resend failed:", err);
      toast.error("Failed to resend invoice email");
    } finally {
      setSending(false);
    }
  };

  const handleMarkPaid = async () => {
    try {
      setLoading(true);
      await updateInvoiceStatus(invoice._id, "paid");
      toast.success("Invoice marked as paid");
      onStatusChange();
    } catch (err) {
      toast.error("Failed to mark invoice as paid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-start justify-between">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Invoice {invoice.invoiceNumber}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Client: {invoice.clientId?.name}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <StatusBadge status={invoice.status} />

        {invoice.status === "draft" && (
          <>
            <button
              onClick={() => navigate(`/invoices/${invoice._id}/edit`)}
              className="rounded-lg bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200"
            >
              Edit
            </button>

            <button
              onClick={handleSend}
              disabled={sending}
              className="rounded-lg bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send Invoice"}
            </button>
          </>
        )}

        {invoice.status === "sent" && (
          <>
            <button
              onClick={handleResend}
              disabled={sending}
              className="rounded-lg bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {sending ? "Resending…" : "Resend Email"}
            </button>

            <button
              onClick={handleMarkPaid}
              disabled={loading}
              className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Updating…" : "Mark as Paid"}
            </button>
          </>
        )}

        {invoice.status !== "draft" && (
          <button
            onClick={handleDownloadPdf}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
          >
            Download PDF
          </button>
        )}
      </div>

    </div>
  );
};

export default InvoiceHeader;
