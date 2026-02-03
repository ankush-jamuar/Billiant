const InvoiceTotals = ({ invoice }) => {
  return (
    <div className="flex justify-end">
      <div
        className="
          w-full max-w-sm
          rounded-xl border border-slate-200
          bg-slate-50 px-6 py-5
        "
      >
        <div className="space-y-3 text-sm">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-slate-600">
            <span>Subtotal</span>
            <span>₹{invoice.subtotal}</span>
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between text-slate-600">
            <span>Tax ({invoice.tax}%)</span>
            <span>₹{invoice.taxAmount}</span>
          </div>

          {/* Discount */}
          {invoice.discount > 0 && (
            <div className="flex items-center justify-between text-slate-600">
              <span>Discount</span>
              <span>-₹{invoice.discount}</span>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-slate-200 pt-3" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-slate-900">
              Total
            </span>
            <span className="text-lg font-semibold text-slate-900">
              ₹{invoice.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;
