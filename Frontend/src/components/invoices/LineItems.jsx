const LineItems = ({ items, setItems }) => {
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "quantity" || field === "unitPrice"
        ? Number(value)
        : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
        Line Items
      </h3>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 items-center"
          >
            <input
              className="col-span-5 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />

            <input
              type="number"
              min="1"
              className="col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
              value={item.quantity}
              onChange={(e) =>
                handleChange(index, "quantity", e.target.value)
              }
            />

            <input
              type="number"
              min="0"
              className="col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
              value={item.unitPrice}
              onChange={(e) =>
                handleChange(index, "unitPrice", e.target.value)
              }
            />

            <div className="col-span-2 text-right text-sm font-medium text-slate-900">
              ₹{item.quantity * item.unitPrice}
            </div>

            <button
              onClick={() => removeItem(index)}
              className="col-span-1 text-slate-400 hover:text-red-600 transition"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        + Add line item
      </button>
    </div>
  );
};

export default LineItems;
