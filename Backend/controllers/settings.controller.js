import Settings from "../models/settings.model.js";

export const getSettings = async (req, res) => {
  let settings = await Settings.findOne({ userId: req.user._id });

  if (!settings) {
    settings = await Settings.create({ userId: req.user._id });
  }

  res.json({ success: true, data: settings });
};

export const updateSettings = async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    { userId: req.user._id },
    req.body,
    { new: true, upsert: true }
  );

  res.json({ success: true, data: settings });
};
