import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../../services/invoice.service";
import InvoiceHeader from "../../components/invoices/InvoiceHeader";
import InvoiceItemsTable from "../../components/invoices/InvoiceItemsTable";
import InvoiceTotals from "../../components/invoices/InvoiceTotals";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  const loadInvoice = async () => {
    const res = await getInvoiceById(id);
    setInvoice(res.data.data);
  };

  useEffect(() => {
    loadInvoice();
  }, [id]);

  if (!invoice) return <p>Loading invoice...</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InvoiceHeader invoice={invoice} onStatusChange={loadInvoice} />
      <InvoiceItemsTable items={invoice.items} />
      <InvoiceTotals invoice={invoice} />
    </div>
  );
};

export default InvoiceDetails;
