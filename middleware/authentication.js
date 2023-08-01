const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET_KEY;

function reqAuth(req, res, next) {
  const authToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  jwt.verify(authToken, jwtKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decodedToken.userId;
    next();
  });
}

module.exports = {
  reqAuth,
};
