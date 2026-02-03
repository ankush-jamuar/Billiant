import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LineItems from "./LineItems";
import InvoiceSummary from "./InvoiceSummary";

import {
  createInvoice,
  getInvoiceById,
  updateInvoice,
} from "../../services/invoice.service";

import { getClients } from "../../services/client.services";

const InvoiceForm = ({ invoiceId }) => {
  const navigate = useNavigate();

  /* -------------------- STATE -------------------- */

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");

  const [invoiceStatus, setInvoiceStatus] = useState("draft");

  const [items, setItems] = useState([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);

  /* -------------------- LOAD CLIENTS -------------------- */

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await getClients();
        setClients(res.data.data);
      } catch (err) {
        console.error("Failed to load clients", err);
      }
    };

    loadClients();
  }, []);

  /* -------------------- LOAD INVOICE (EDIT MODE) -------------------- */

  useEffect(() => {
    if (!invoiceId) {
      setLoading(false);
      return;
    }

    const loadInvoice = async () => {
      try {
        const res = await getInvoiceById(invoiceId);
        const inv = res.data.data;

        setClientId(inv.clientId?._id || "");
        setItems(inv.items);
        setTax(inv.tax);
        setDiscount(inv.discount);
        setIssueDate(inv.issueDate.split("T")[0]);
        setDueDate(inv.dueDate.split("T")[0]);
        setInvoiceStatus(inv.status);
      } catch (err) {
        console.error("Failed to load invoice", err);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [invoiceId]);

  /* -------------------- SUBMIT -------------------- */

  const handleSubmit = async () => {
    if (!clientId || items.length === 0 || !dueDate) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      clientId,
      items,
      tax,
      discount,
      issueDate,
      dueDate,
    };

    try {
      if (invoiceId) {
        await updateInvoice(invoiceId, payload);
        navigate(`/invoices/${invoiceId}`);
      } else {
        const res = await createInvoice(payload);
        navigate(`/invoices/${res.data.data._id}`);
      }
    } catch (err) {
      console.error("Failed to save invoice", err);
      alert("Failed to save invoice");
    }
  };

  /* -------------------- GUARDS -------------------- */

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
        Loading invoice…
      </div>
    );
  }

  if (invoiceId && invoiceStatus !== "draft") {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-red-600">
        This invoice can no longer be edited.
      </div>
    );
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">
        {/* Client */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Client
          </label>

          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="
              w-full rounded-lg border border-slate-300
              bg-white px-3 py-2 text-sm
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
            "
          >
            <option value="">Select a client</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Issue Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <LineItems items={items} setItems={setItems} />
      </div>

      {/* RIGHT */}
      <InvoiceSummary
        items={items}
        tax={tax}
        discount={discount}
        setTax={setTax}
        setDiscount={setDiscount}
        onSave={handleSubmit}
      />
    </div>
  );
};

export default InvoiceForm;
