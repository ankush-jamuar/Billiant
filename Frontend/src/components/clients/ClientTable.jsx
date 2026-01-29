const ClientTable = ({ clients }) => {
  if (clients.length === 0) {
    return (
      <div className="rounded border p-6 text-center text-gray-600">
        No clients yet. Add your first client to get started.
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-left">
          <th className="py-2">Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client._id} className="border-b">
            <td className="py-2 font-medium">{client.name}</td>
            <td>{client.email || "-"}</td>
            <td>{client.phone || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;