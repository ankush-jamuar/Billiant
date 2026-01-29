const InvoiceItemsTable = ({ items }) => {
  return (
    <div className="rounded bg-white p-6 shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-b last:border-b-0">
              <td className="py-2">{item.description}</td>
              <td>{item.quantity}</td>
              <td>₹{item.unitPrice}</td>
              <td className="text-right">
                ₹{item.quantity * item.unitPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsTable;
