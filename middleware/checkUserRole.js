// Middleware to check user roles
export const checkUserRole = (req, res, next) => {
  const user = req.user; // Assuming you attach the user object to the request
  if (user && user.email !== "visitor@wpt.com") {
    next(); // User has the required role
  } else {
    res.status(403).json({ message: "Unauthorized" }); // Access denied
  }
};
