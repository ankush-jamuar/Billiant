const STATUS_STYLES = {
  draft: {
    label: "Draft",
    className:
      "bg-slate-100 text-slate-700 border border-slate-200",
  },
  sent: {
    label: "Sent",
    className:
      "bg-indigo-50 text-indigo-700 border border-indigo-100",
  },
  paid: {
    label: "Paid",
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-100",
  },
};

const StatusBadge = ({ status = "draft" }) => {
  const config = STATUS_STYLES[status] || STATUS_STYLES.draft;

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full px-3 py-1
        text-xs font-medium
        whitespace-nowrap
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
