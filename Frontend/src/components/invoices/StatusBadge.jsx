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
  overdue: {
    label: "Overdue",
    className:
      "bg-red-50 text-red-700 border border-red-100",
  },
};

/* -----------------------------
   SAFE COMPUTED STATUS
----------------------------- */
const getComputedStatus = (invoice) => {
  if (!invoice) return "draft";

  const { status, dueDate } = invoice;

  if (status === "paid") return "paid";

  if (status === "sent" && dueDate) {
    const today = new Date();
    const due = new Date(dueDate);

    // ⏱ Normalize time
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      return "overdue";
    }
  }

  return status || "draft";
};


const StatusBadge = ({ invoice, status }) => {
  // ✅ Works with EITHER invoice OR raw status
  const computedStatus = invoice
    ? getComputedStatus(invoice)
    : status || "draft";

  const config =
    STATUS_STYLES[computedStatus] || STATUS_STYLES.draft;

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
