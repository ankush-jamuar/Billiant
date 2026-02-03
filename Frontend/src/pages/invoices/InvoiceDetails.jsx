import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../../services/invoice.service";

import InvoiceHeader from "../../components/invoices/InvoiceHeader";
import InvoiceItemsTable from "../../components/invoices/InvoiceItemsTable";
import InvoiceTotals from "../../components/invoices/InvoiceTotals";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      const res = await getInvoiceById(id);
      setInvoice(res.data.data);
    } catch (err) {
      console.error("Failed to reload invoice", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoice();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
        Loading invoice…
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
        Invoice not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header (status + actions) */}
      <InvoiceHeader
        invoice={invoice}
        onStatusChange={loadInvoice}
      />

      {/* Main invoice card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Client + Invoice meta */}
        <div className="grid grid-cols-1 gap-6 border-b border-slate-200 px-6 py-5 sm:grid-cols-2">
          {/* Client */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Billed To
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {invoice.clientId?.name}
            </p>
            <p className="text-sm text-slate-600">
              {invoice.clientId?.email}
            </p>
          </div>

          {/* Invoice meta */}
          <div className="sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Invoice
            </p>
            <p className="mt-1 text-sm text-slate-700">
              <span className="font-medium">#{invoice.invoiceNumber}</span>
            </p>
            <p className="text-sm text-slate-600">
              Issued:{" "}
              {invoice.issueDate
                ? new Date(invoice.issueDate).toLocaleDateString("en-IN")
                : "—"}
            </p>
            <p className="text-sm text-slate-600">
              Due:{" "}
              {invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString("en-IN")
                : "—"}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="px-6 py-6">
          <InvoiceItemsTable items={invoice.items} />
        </div>

        {/* Totals */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-6">
          <div className="w-full max-w-sm">
            <InvoiceTotals invoice={invoice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
