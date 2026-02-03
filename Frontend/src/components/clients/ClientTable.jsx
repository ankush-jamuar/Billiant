const ClientTable = ({ clients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* HEADER */}
        <thead>
          <tr className="
            border-b border-slate-200
            bg-slate-50
            text-left text-xs font-medium
            uppercase tracking-wide text-slate-500
          ">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {clients.map((client, idx) => (
            <tr
              key={client._id}
              className={`
                border-b last:border-b-0
                transition
                hover:bg-indigo-50/40
                ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}
              `}
            >
              {/* Name */}
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-slate-900">
                  {client.name}
                </p>
              </td>

              {/* Email */}
              <td className="px-6 py-4">
                <p className="text-sm text-slate-600">
                  {client.email || "—"}
                </p>
              </td>

              {/* Phone */}
              <td className="px-6 py-4">
                <p className="text-sm text-slate-600">
                  {client.phone || "—"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
