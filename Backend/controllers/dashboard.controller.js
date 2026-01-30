import Invoice from "../models/invoice.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();

    // Total revenue (PAID)
    const totalRevenueAgg = await Invoice.aggregate([
      { $match: { userId, status: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Outstanding (SENT)
    const outstandingAgg = await Invoice.aggregate([
      { $match: { userId, status: "sent" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const outstanding = outstandingAgg[0]?.total || 0;

    // Draft count
    const draftCount = await Invoice.countDocuments({
      userId,
      status: "draft",
    });

    // Overdue count
    const overdueCount = await Invoice.countDocuments({
      userId,
      status: "sent",
      dueDate: { $lt: today },
    });

    // Recent invoices
    const recentInvoices = await Invoice.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("clientId", "name")
      .select("invoiceNumber total status clientId");

    // Status breakdown
    const statusAgg = await Invoice.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const statusBreakdown = {
      draft: 0,
      sent: 0,
      paid: 0,
    };

    statusAgg.forEach((s) => {
      statusBreakdown[s._id] = s.count;
    });

    return res.json({
      success: true,
      data: {
        totalRevenue,
        outstanding,
        draftCount,
        overdueCount,
        recentInvoices: recentInvoices.map((inv) => ({
          _id: inv._id,
          invoiceNumber: inv.invoiceNumber,
          clientName: inv.clientId?.name,
          total: inv.total,
          status: inv.status,
        })),
        statusBreakdown,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};
