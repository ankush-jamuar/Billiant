import Client from "../models/client.model.js";

export const createClient = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Client name is required",
    });
  }

  const client = await Client.create({
    userId: req.user._id,
    name,
    email,
    phone,
    address,
  });

  res.status(201).json({
    success: true,
    data: client,
  });
};

export const getClients = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {
      userId: req.user._id,
    };

    let clients = await Client.find(filter).sort({ createdAt: -1 });

    if (q) {
      const search = q.toLowerCase();
      clients = clients.filter((c) =>
        c.name.toLowerCase().includes(search) ||
        c.email?.toLowerCase().includes(search) ||
        c.phone?.includes(search)
      );
    }

    res.json({
      success: true,
      data: clients,
    });
  } catch (err) {
    console.error("Get clients failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
    });
  }
};
