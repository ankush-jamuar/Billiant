const InvoiceSummary = ({
  items,
  tax,
  discount,
  setTax,
  setDiscount,
  onSave,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const taxAmount = subtotal * (Number(tax) / 100);
  const total = subtotal + taxAmount - Number(discount);

  return (
    <div className="rounded bg-white p-4 shadow-sm">
      <h2 className="mb-4 font-medium">Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Tax (%)</span>
          <input
            type="number"
            min="0"
            className="w-24 rounded border px-2 py-1 text-right"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Discount (₹)</span>
          <input
            type="number"
            min="0"
            className="w-24 rounded border px-2 py-1 text-right"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="flex justify-between border-t pt-2 font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onSave}
        className="mt-6 w-full rounded bg-black px-4 py-2 text-white"
      >
        Save Draft
      </button>
    </div>
  );
};

export default InvoiceSummary;
