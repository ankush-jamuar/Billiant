import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../../components/invoices/InvoiceForm";
import { getClients } from "../../services/client.services";

const NewInvoice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasClients, setHasClients] = useState(false);

  useEffect(() => {
    const checkClients = async () => {
      try {
        const res = await getClients();
        setHasClients(res.data.data.length > 0);
      } catch (err) {
        console.error("Failed to check clients", err);
      } finally {
        setLoading(false);
      }
    };

    checkClients();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
        Preparing invoice editor…
      </div>
    );
  }

  if (!hasClients) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-white px-6 py-20 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Add a client first
        </h2>

        <p className="max-w-md text-sm text-slate-600">
          You need at least one client before creating an invoice.
          Add a client to get started.
        </p>

        <button
          onClick={() => navigate("/clients")}
          className="
            rounded-xl bg-indigo-600 px-5 py-2
            text-sm font-medium text-white
            hover:bg-indigo-700 transition
          "
        >
          Add Client
        </button>
      </div>
    );
  }

  return <InvoiceForm />;
};

export default NewInvoice;
