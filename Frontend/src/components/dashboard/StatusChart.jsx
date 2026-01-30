import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatusChart = ({ data }) => {
  if (!data) return null;

  const chartData = [
    { name: "Draft", value: data.draft },
    { name: "Sent", value: data.sent },
    { name: "Paid", value: data.paid },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-medium mb-4">Invoice Status</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
