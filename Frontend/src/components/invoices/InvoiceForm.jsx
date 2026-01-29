import { useEffect, useState } from "react";
import LineItems from "./LineItems";
import InvoiceSummary from "./InvoiceSummary";
import {
  createInvoice,
  getInvoiceById,
  updateInvoice,
} from "../../services/invoice.service";
import { useNavigate } from "react-router-dom";

const InvoiceForm = ({ invoiceId }) => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("draft");
  const [items, setItems] = useState([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!invoiceId) return;

    const loadInvoice = async () => {
      const res = await getInvoiceById(invoiceId);
      const inv = res.data.data;

      setClientId(inv.clientId._id);
      setItems(inv.items);
      setTax(inv.tax);
      setDiscount(inv.discount);
      setIssueDate(inv.issueDate.split("T")[0]);
      setDueDate(inv.dueDate.split("T")[0]);
      setInvoiceStatus(inv.status);
    };

    loadInvoice();
  }, [invoiceId]);

  const handleSubmit = async () => {
    if (!clientId || items.length === 0 || !dueDate) return;

    const payload = {
      clientId,
      items,
      tax,
      discount,
      issueDate,
      dueDate,
    };

    if (invoiceId) {
      await updateInvoice(invoiceId, payload);
      navigate(`/invoices/${invoiceId}`);
    } else {
      await createInvoice(payload);
      navigate("/invoices");
    }
  };

  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState("");

  if (invoiceId && invoiceStatus !== "draft") {
    return <p>This invoice cannot be edited.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left: Form */}
      <div className="col-span-2 space-y-6">
        {/* Client */}
        <div className="rounded bg-white p-4 shadow-sm">
          <label className="mb-2 block font-medium">Client</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Issue Date
              </label>
              <input
                type="date"
                className="w-full rounded border px-3 py-2"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Due Date</label>
              <input
                type="date"
                className="w-full rounded border px-3 py-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <LineItems items={items} setItems={setItems} />
      </div>

      {/* Right: Summary */}
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
