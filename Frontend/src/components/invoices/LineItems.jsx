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
    <div className="rounded bg-white p-4 shadow-sm">
      <h2 className="mb-4 font-medium">Line Items</h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 items-center"
          >
            <input
              className="col-span-5 rounded border px-3 py-2"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />

            <input
              type="number"
              min="1"
              className="col-span-2 rounded border px-3 py-2"
              value={item.quantity}
              onChange={(e) =>
                handleChange(index, "quantity", e.target.value)
              }
            />

            <input
              type="number"
              min="0"
              className="col-span-2 rounded border px-3 py-2"
              value={item.unitPrice}
              onChange={(e) =>
                handleChange(index, "unitPrice", e.target.value)
              }
            />

            <div className="col-span-2 text-right font-medium">
              ₹{item.quantity * item.unitPrice}
            </div>

            <button
              onClick={() => removeItem(index)}
              className="col-span-1 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        + Add line item
      </button>
    </div>
  );
};

export default LineItems;
