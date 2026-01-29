import InvoiceForm from "../../components/invoices/InvoiceForm";
import { useParams } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Invoice</h1>
      <InvoiceForm invoiceId={id} />
    </div>
  );
};

export default EditInvoice;
