import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.token ||
      req.headers.authorization ||
      req.headers.Authorization;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    // ✅ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if the email matches the admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
