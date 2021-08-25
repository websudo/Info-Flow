const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log( token )
  // * Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // * Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // * Add user from payload
    req.user = decoded;
    next();
  } 
  
  catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};