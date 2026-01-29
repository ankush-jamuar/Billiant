const InvoiceTotals = ({ invoice }) => {
  const taxAmount =
    invoice.subtotal * (invoice.tax / 100);

  return (
    <div className="rounded bg-white p-6 shadow-sm">
      <div className="space-y-2 text-sm max-w-xs ml-auto">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{invoice.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax ({invoice.tax}%)</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{invoice.discount}</span>
        </div>

        <div className="flex justify-between border-t pt-2 font-semibold">
          <span>Total</span>
          <span>₹{invoice.total}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;
