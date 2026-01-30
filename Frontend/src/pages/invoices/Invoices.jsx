import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../../services/invoice.service";
import InvoiceTable from "../../components/invoices/InvoiceTable";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Invoices</h1>

        <button
          onClick={() => navigate("/invoices/new")}
          className="rounded bg-black px-4 py-2 text-white"
        >
          + New Invoice
        </button>
      </div>

      <div className="rounded bg-white p-4 shadow-sm">
        {loading ? (
          <p>Loading invoices...</p>
        ) : (
          <InvoiceTable invoices={invoices} />
        )}
      </div>
    </div>
  );
};

export default Invoices;
