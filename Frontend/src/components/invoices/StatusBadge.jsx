const STATUS_STYLES = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
