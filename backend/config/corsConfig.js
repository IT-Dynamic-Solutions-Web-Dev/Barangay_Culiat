const allowedOrigins = require('./allowedOrigins');

const corsConfig = {
  origin: (origin, callback) => {     
    if(allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin is not Allowed By Cors!"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsConfig;