import MetricCard from "../../components/dashboard/MetricCard";
// import RecentInvoices from "../../components/dashboard/RecentInvoices";
// import StatusChart from "../../components/dashboard/StatusChart";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value="₹0" />
        <MetricCard title="Outstanding" value="₹0" />
        <MetricCard title="Draft Invoices" value="0" />
        <MetricCard title="Overdue" value="0" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* <RecentInvoices /> */}
        </div>

        {/* <StatusChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;
