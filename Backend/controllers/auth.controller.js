import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  // TEMP CHECK (for now)
  if (email !== "test@example.com" || password !== "123456") {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { userId: "demo-user-id" },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    data: { token },
  });
};
