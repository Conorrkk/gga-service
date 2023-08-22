const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET_KEY;

function reqAuth(req, res, next) {
  // const to hold coded token for auth check
  const authToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  // decode token and get user id if valid
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
