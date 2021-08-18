const jwt = require("jsonwebtoken");


/**
 * * CREATING JSON WEB TOKEN FOR AUTHORIZATION 
 */
exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};


/**
 * * DON'T FORGET TO ADD TOKEN_SECRET IN THE process.env FILE 
 */