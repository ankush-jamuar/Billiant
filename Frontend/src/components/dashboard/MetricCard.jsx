const MetricCard = ({ title, value }) => {
  return (
    <div
      className="
        rounded-xl bg-white p-5
        shadow-sm border border-slate-200
        transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5
      "
    >
      {/* Label */}
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      {/* Value */}
      <div className="mt-2 flex items-end justify-between">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          {value}
        </h3>

        {/* Accent dot (visual anchor) */}
        <span className="h-2 w-2 rounded-full bg-indigo-500" />
      </div>
    </div>
  );
};

export default MetricCard;
