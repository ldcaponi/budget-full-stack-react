const passport = require("passport");
const passportJWT = require("passport-jwt");
const pool = require("../../db");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.APP_SECRET;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  pool.query(
    `SELECT id, email, name FROM users WHERE id = $1`,
    [jwt_payload.id],
    (error, results) => {
      if (error) {
        return next(error, false);
      }
      return next(null, results.rows[0]);
    }
  );
});

passport.use(strategy);
