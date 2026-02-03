const InvoiceItemsTable = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* HEADER */}
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3 text-center">Qty</th>
            <th className="px-4 py-3 text-right">Unit Price</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {items.map((item, idx) => (
            <tr
              key={idx}
              className={`
                border-b last:border-b-0
                transition
                hover:bg-slate-50
              `}
            >
              {/* Description */}
              <td className="px-4 py-4">
                <p className="text-sm font-medium text-slate-900">
                  {item.description || "—"}
                </p>
              </td>

              {/* Quantity */}
              <td className="px-4 py-4 text-center">
                <span className="text-sm text-slate-700">
                  {item.quantity}
                </span>
              </td>

              {/* Unit Price */}
              <td className="px-4 py-4 text-right">
                <span className="text-sm text-slate-700">
                  ₹{item.unitPrice}
                </span>
              </td>

              {/* Total */}
              <td className="px-4 py-4 text-right">
                <span className="text-sm font-semibold text-slate-900">
                  ₹{item.quantity * item.unitPrice}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsTable;
