import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInvoiceById } from "../../services/invoice.service";

const InvoiceDetails = () => {
  const { id } = useParams(); // 👈 critical
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadInvoice = async () => {
      try {
        const res = await getInvoiceById(id);
        setInvoice(res.data.data);
      } catch (err) {
        console.error("Failed to load invoice", err);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id]); // 👈 id MUST be dependency

  if (loading) return <p>Loading invoice...</p>;
  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div>
      {/* render invoice */}
    </div>
  );
};

export default InvoiceDetails;
