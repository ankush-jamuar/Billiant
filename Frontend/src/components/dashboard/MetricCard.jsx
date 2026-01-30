const MetricCard = ({ title, value }) => {
  return (
    <div className="rounded bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default MetricCard;
