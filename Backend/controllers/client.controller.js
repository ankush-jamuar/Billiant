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
    userId: req.userId,
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
  const clients = await Client.find({ userId: req.userId }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    data: clients,
  });
};