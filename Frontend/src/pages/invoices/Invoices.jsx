import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../../services/invoice.service";
import { getClients } from "../../services/client.services";
import InvoiceTable from "../../components/invoices/InvoiceTable";
import EmptyState from "../../components/common/EmptyState";
import { Search, Plus, FileText } from "lucide-react";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [hasClients, setHasClients] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      const res = await getClients();
      setHasClients(res.data.data.length > 0);
    };
    loadClients();
  }, []);


  const loadInvoices = async () => {
    try {
      setLoading(true);
      const res = await getInvoices();
      setInvoices(res.data.data);
    } catch (err) {
      console.error("Failed to load invoices", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // 🔍 SEARCH FILTER
  const filteredInvoices = invoices.filter((inv) => {
    const q = search.toLowerCase();

    return (
      inv.invoiceNumber?.toLowerCase().includes(q) ||
      inv.clientId?.name?.toLowerCase().includes(q) ||
      inv.status?.toLowerCase().includes(q)
    );
  });

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading invoices…
      </div>
    );
  }

  // 🌟 GLOBAL EMPTY STATE (no invoices at all)
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No invoices yet"
        description="Create and send professional invoices to your clients. You’ll need at least one client to get started."
        primaryAction={{
          label: "Create Invoice",
          to: "/invoices/new",
        }}
        secondaryAction={{
          label: "Add Client",
          to: "/clients",
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search invoices…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full rounded-xl border border-slate-200
              bg-white pl-9 pr-3 py-2 text-sm
              outline-none
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
            "
          />
        </div>

        {/* CTA */}
        <button
  onClick={() => {
    if (!hasClients) {
      navigate("/clients");
      return;
    }
    navigate("/invoices/new");
  }}
  className={`
    inline-flex items-center gap-2 rounded-xl px-4 py-2
    text-sm font-medium text-white transition
    ${
      hasClients
        ? "bg-indigo-600 hover:bg-indigo-700"
        : "bg-slate-300 cursor-not-allowed"
    }
  `}
>
  + New Invoice
</button>

      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <InvoiceTable invoices={filteredInvoices} />
      </div>
    </div>
  );
};

export default Invoices;