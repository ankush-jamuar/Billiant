import { useEffect, useState } from "react";
import MetricCard from "../../components/dashboard/MetricCard";
import RecentInvoices from "../../components/dashboard/RecentInvoices";
import StatusChart from "../../components/dashboard/StatusChart";
import { getDashboardSummary } from "../../services/dashboard.services";
import { useAuth } from "../../context/AuthContext";
import DashboardEmptyState from "../../components/dashboard/DashboardEmptyState";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardSummary();
        setSummary(res.data.data);
      } catch (err) {
        console.error("Dashboard API failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p className="text-sm text-slate-500">Loading dashboard…</p>;
  if (!summary) return <p className="text-sm text-red-500">Failed to load dashboard.</p>;
  if (summary.recentInvoices.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* 📊 Metrics */}
      <div className="grid grid-cols-4 gap-6">
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

      {/* 📈 Main content */}
      <div className="grid grid-cols-3 gap-6 items-stretch">
        <div className="col-span-2 h-full">
          <RecentInvoices invoices={summary.recentInvoices} />
        </div>

        <div className="h-full">
          <StatusChart data={summary.statusBreakdown} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
