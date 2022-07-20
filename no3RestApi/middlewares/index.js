const jwt = require('jsonwebtoken');

module.exports = {
  login: (req, res, next) => {
    try {
      const token = req.headers['authorization'];
      if (!token) return res.notAuthorized();

      const secretKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, secretKey);

      req.user = decoded;

      next();
    } catch (err) {
      if (err.message == 'jwt malformed') {
        return res.respondServerError(err.message);
      }

      return res.respondServerError(err.message);
    }
  },
};
