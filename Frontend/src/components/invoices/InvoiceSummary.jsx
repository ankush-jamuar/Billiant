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
    <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
        Invoice Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Tax (%)</span>
          <input
            type="number"
            min="0"
            className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Discount (₹)</span>
          <input
            type="number"
            min="0"
            className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="border-t border-slate-200 pt-3 flex justify-between font-semibold text-slate-900">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onSave}
        className="
          mt-6 w-full rounded-xl
          bg-indigo-600 px-4 py-2
          text-sm font-medium text-white
          hover:bg-indigo-700 transition
        "
      >
        Save Draft
      </button>
    </div>
  );
};

export default InvoiceSummary;
