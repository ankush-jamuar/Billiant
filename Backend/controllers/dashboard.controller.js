import Invoice from "../models/invoice.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;

    // ✅ Normalize today (start of day ONLY)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    /* -----------------------------
       TOTAL REVENUE (PAID)
    ----------------------------- */
    const totalRevenueAgg = await Invoice.aggregate([
      { $match: { userId, status: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    /* -----------------------------
       OUTSTANDING (SENT)
    ----------------------------- */
    const outstandingAgg = await Invoice.aggregate([
      { $match: { userId, status: "sent" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const outstanding = outstandingAgg[0]?.total || 0;

    /* -----------------------------
       DRAFT COUNT
    ----------------------------- */
    const draftCount = await Invoice.countDocuments({
      userId,
      status: "draft",
    });

    /* -----------------------------
       OVERDUE COUNT (STRICT)
    ----------------------------- */
    const overdueCount = await Invoice.countDocuments({
      userId,
      status: "sent",
      dueDate: { $lt: today }, // ✅ strictly before today
    });

    /* -----------------------------
       RECENT INVOICES
    ----------------------------- */
    const recentInvoices = await Invoice.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("clientId", "name")
      .select("invoiceNumber total status clientId dueDate")
      .lean();

    /* -----------------------------
       STATUS BREAKDOWN (SAFE)
    ----------------------------- */
    const statusAgg = await Invoice.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // ✅ Initialize with overdue included
    const statusBreakdown = {
      draft: 0,
      sent: 0,
      paid: 0,
      overdue: overdueCount,
    };

    statusAgg.forEach((s) => {
      if (statusBreakdown[s._id] !== undefined) {
        statusBreakdown[s._id] = s.count;
      }
    });

    // ✅ Remove overdue invoices from sent
    statusBreakdown.sent = Math.max(
      statusBreakdown.sent - overdueCount,
      0
    );

    /* -----------------------------
       RESPONSE
    ----------------------------- */
    return res.json({
      success: true,
      data: {
        totalRevenue,
        outstanding,
        draftCount,
        overdueCount,
        recentInvoices: recentInvoices.map((inv) => ({
          _id: inv._id,
          invoiceNumber: inv.invoiceNumber || "—",
          clientName: inv.clientId?.name || "—",
          total: inv.total || 0,
          status:
            inv.status === "sent" &&
            inv.dueDate &&
            new Date(inv.dueDate).setHours(0, 0, 0, 0) < today
              ? "overdue"
              : inv.status,
        })),
        statusBreakdown,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};
