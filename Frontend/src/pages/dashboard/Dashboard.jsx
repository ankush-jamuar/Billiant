import { useEffect, useState } from "react";
import MetricCard from "../../components/dashboard/MetricCard";
import RecentInvoices from "../../components/dashboard/RecentInvoices";
import StatusChart from "../../components/dashboard//StatusChart";
import { getDashboardSummary } from "../../services/dashboard.services";
import { useAuth } from "../../context/AuthContext";
import EmailVerificationBanner from "../../components/common/EmailVerificationBanner";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        console.log("Calling dashboard API...");
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

  if (loading) return <p>Loading dashboard...</p>;
  if (!summary) return <p>Failed to load dashboard.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <EmailVerificationBanner user={user} />

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value={`₹${summary.totalRevenue}`} />
        <MetricCard title="Outstanding" value={`₹${summary.outstanding}`} />
        <MetricCard title="Draft Invoices" value={summary.draftCount} />
        <MetricCard title="Overdue" value={summary.overdueCount} />
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
