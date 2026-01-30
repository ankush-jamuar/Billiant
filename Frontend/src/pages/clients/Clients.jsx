import { useEffect, useState } from "react";
import ClientTable from "../../components/clients/ClientTable";
import ClientModal from "../../components/clients/ClientModal";
import { getClients } from "../../services/client.services";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded bg-black px-4 py-2 text-white"
        >
          + Add Client
        </button>
      </div>

      <div className="rounded bg-white p-4 shadow-sm">
        {loading ? (
          <p>Loading clients...</p>
        ) : (
          <ClientTable clients={clients} />
        )}
      </div>

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
