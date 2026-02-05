import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  draft: "#CBD5E1",   // slate-300
  sent: "#6366F1",    // indigo-500
  paid: "#22C55E",    // green-500
  overdue: "#EF4444", // 🔴 red-500
};

const StatusChart = ({ data }) => {
  // Normalize object → array
  const chartData = data
    ? Object.entries(data).map(([status, count]) => ({
        status,
        count,
      }))
    : [];

  if (chartData.length === 0) {
    return (
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 text-sm text-slate-500">
        No invoice data
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 min-h-[64px]">
        <h3 className="text-base font-semibold text-slate-900">
          Invoice Status
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Distribution by status
        </p>
      </div>

      {/* Chart */}
      <div className="h-56 p-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={COLORS[entry.status] || "#94A3B8"} // safe fallback
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-6 pb-5 space-y-2 text-sm">
        {chartData.map((item) => (
          <div
            key={item.status}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[item.status] || "#94A3B8",
                }}
              />
              <span className="capitalize text-slate-700">
                {item.status}
              </span>
            </div>

            <span className="font-medium text-slate-900">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusChart;
