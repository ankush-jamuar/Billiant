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

  if (loading) return <p>Loading invoice...</p>;
  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InvoiceHeader
        invoice={invoice}
        onStatusChange={loadInvoice} // ✅ PASS IT
      />
      <InvoiceItemsTable items={invoice.items} />
      <InvoiceTotals invoice={invoice} />
    </div>
  );
};

export default InvoiceDetails;
