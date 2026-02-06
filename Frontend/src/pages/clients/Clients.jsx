import { useEffect, useState } from "react";
import { Search, Plus, Users } from "lucide-react";

import ClientTable from "../../components/clients/ClientTable";
import ClientModal from "../../components/clients/ClientModal";
import EmptyState from "../../components/common/EmptyState";

import { getClients } from "../../services/client.services";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const loadClients = async () => {
    try {
      setLoading(true);
      const res = await getClients();
      setClients(res.data.data);
    } catch (err) {
      console.error("Failed to load clients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  /* 🔍 SEARCH */
  const filteredClients = clients.filter((client) => {
    const q = search.toLowerCase();
    return (
      client.name?.toLowerCase().includes(q) ||
      client.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* ACTION ROW */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search clients..."
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
          onClick={() => setOpenModal(true)}
          className="
            inline-flex items-center gap-2
            rounded-xl bg-indigo-600
            px-4 py-2 text-sm font-medium text-white
            hover:bg-indigo-700 transition
          "
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* CONTENT */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading clients…
          </div>
        ) : clients.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No clients yet"
            description="Add your first client to start creating invoices and tracking payments."
            primaryAction={{
              label: "Add Client",
              onClick: () => setOpenModal(true),
            }}
          />
        ) : filteredClients.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No clients match your search.
          </div>
        ) : (
          <ClientTable clients={filteredClients} />
        )}
      </div>

      {/* MODAL */}
      <ClientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onClientCreated={(newClient) =>
          setClients((prev) => [newClient, ...prev])
        }
      />
    </div>
  );
};

export default Clients;