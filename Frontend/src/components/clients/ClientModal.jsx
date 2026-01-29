import { useState } from "react";
import { createClient } from "../../services/client.services";

const ClientModal = ({ open, onClose, onClientCreated }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const res = await createClient(form);
    onClientCreated(res.data.data);

    setForm({ name: "", email: "", phone: "", address: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Add Client</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Client name *"
            className="w-full rounded border px-3 py-2"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full rounded border px-3 py-2"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full rounded border px-3 py-2"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            className="w-full rounded border px-3 py-2"
            value={form.address}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
