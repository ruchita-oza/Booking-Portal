const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return next(createError(401, "You are not allowed to access this"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin === "Admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized to access this"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === "Admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized to access this"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
