const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request

    // Role-based access check (for admin routes)
    if (req.user.role !== 'admin' && req.originalUrl.includes('/admin')) {
      return res.status(403).json({ message: 'Forbidden: You do not have admin rights' });
    }

    next(); // Proceed to next middleware/route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
