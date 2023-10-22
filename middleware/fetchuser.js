const jwt = require('jsonwebtoken')
require('dotenv').config()
const fetchuser = (req, res, next) => {
  const token = req.header("Authorization");
    console.log("Received Token:", token);
  
    if (!token) {
      console.log("No Token Provided");
      return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  
    try {
      const data = jwt.verify(token,  process.env.Key);
      console.log("User Data:", data);
      req.user = data.userId;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  };
  
  module.exports = fetchuser; 