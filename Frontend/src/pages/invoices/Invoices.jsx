import { useEffect, useState } from "react";
import { getInvoices } from "../../services/invoice.service";
import InvoiceTable from "../../components/invoices/InvoiceTable";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      const res = await getInvoices();
      setInvoices(res.data.data);
      setLoading(false);
    };

    loadInvoices();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Invoices</h1>

        <button className="rounded bg-black px-4 py-2 text-white">
          + New Invoice
        </button>
      </div>

      <div className="rounded bg-white p-4 shadow-sm">
        {loading ? <p>Loading invoices...</p> : <InvoiceTable invoices={invoices} />}
      </div>
    </div>
  );
};

export default Invoices;
