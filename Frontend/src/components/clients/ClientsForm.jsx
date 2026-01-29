import React from "react";
import { useState } from "react";
import { createClient } from "../../services/client.services";

const ClientsForm = ({ onClientCreated }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.name.trim()) return;

  const res = await createClient(form);

  onClientCreated(res.data.data);

  setForm({ name: "", email: "", phone: "", address: "" });
};
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
      <input
        name="name"
        placeholder="Client name *"
        className="col-span-2 rounded border px-3 py-2"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        className="rounded border px-3 py-2"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        className="rounded border px-3 py-2"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        className="col-span-2 rounded border px-3 py-2"
        value={form.address}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="col-span-2 rounded bg-black px-4 py-2 text-white"
      >
        Add Client
      </button>
    </form>
  );
};

export default ClientsForm;
