const { validateToken } = require("../utils/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];

    if (!token) {
      res.status(401).json({
        error: "Authentication token is missing",
      });
      return;
    }

    try {
      const decoded = validateToken(token);
      req.user = decoded;
    } catch (err) {
      res.status(401).json({
        error: "Invalid authentication token",
      });
      return;
    }

    next();
  };
}

module.exports = checkForAuthenticationCookie;
