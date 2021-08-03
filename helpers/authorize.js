// require("dotenv").config();

function authorize(req, res, next) {
  // authorize based on user role
  if (req.user.role !== process.env.ADMINCODE || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized. Admins only." });
  }
  // authentication and authorization successful
  next();
}

export default authorize;
