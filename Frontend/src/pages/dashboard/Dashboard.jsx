import { useEffect, useState } from "react";
import MetricCard from "../../components/dashboard/MetricCard";
import RecentInvoices from "../../components/dashboard/RecentInvoices";
import { getDashboardSummary } from "../../services/dashboard.services";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      console.log("Calling dashboard API...");
      const res = await getDashboardSummary();
      console.log("Dashboard API response:", res.data);
      setSummary(res.data.data);
    } catch (err) {
      console.error("Dashboard API failed:", err);
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();
}, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!summary) return <p>Failed to load dashboard.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`₹${summary.totalRevenue}`}
        />
        <MetricCard
          title="Outstanding"
          value={`₹${summary.outstanding}`}
        />
        <MetricCard
          title="Draft Invoices"
          value={summary.draftCount}
        />
        <MetricCard
          title="Overdue"
          value={summary.overdueCount}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <RecentInvoices invoices={summary.recentInvoices} />
        </div>

        <StatusChart data={summary.statusBreakdown} />
      </div>
    </div>
  );
};

export default Dashboard;
