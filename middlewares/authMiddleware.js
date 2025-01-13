import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const middleWare = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received Token:", token);
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("decoded---------->>>.", decoded);
    const user = await User.findById(decoded.id).select("-password").lean();
    console.log("user---------->>>.", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default middleWare;
