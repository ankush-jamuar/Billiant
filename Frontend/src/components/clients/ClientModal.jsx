import { useState } from "react";
import { createClient } from "../../services/client.services";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Add Client
            </h2>
            <p className="text-sm text-slate-500">
              Create a client to start invoicing
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Client name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Acme Corp"
              className="
                w-full rounded-xl border border-slate-200
                px-3 py-2 text-sm
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              "
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              name="email"
              placeholder="billing@acme.com"
              className="
                w-full rounded-xl border border-slate-200
                px-3 py-2 text-sm
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              "
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              name="phone"
              placeholder="+91 98765 43210"
              className="
                w-full rounded-xl border border-slate-200
                px-3 py-2 text-sm
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              "
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>
            <textarea
              name="address"
              rows={3}
              placeholder="Street, city, country"
              className="
                w-full rounded-xl border border-slate-200
                px-3 py-2 text-sm
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              "
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl px-4 py-2 text-sm font-medium
                text-slate-600 hover:bg-slate-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                rounded-xl bg-indigo-600 px-5 py-2
                text-sm font-medium text-white
                hover:bg-indigo-700 transition
              "
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
