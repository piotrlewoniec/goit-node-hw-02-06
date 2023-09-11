const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const codeJWT = ({ payload, secret, expires }) =>
  jwt.sign(payload, secret, { expiresIn: expires });
const decodeJWT = ({ token }) => jwt.decode(token);
const verifyJWT = ({ token, secret }) => jwt.verify(token, secret);

const setPassword = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

const validPassword = ({ passwordLogin, passwordDB }) => {
  return bCrypt.compareSync(passwordLogin, passwordDB);
};

const strategyJWT = ({ secret, User }) => {
  const ExtractJWT = passportJWT.ExtractJwt;
  const Strategy = passportJWT.Strategy;

  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
  };

  passport.use(
    new Strategy(params, async function (request, payload, done) {
      try {
        const [user] = await User.find({ _id: payload.id });
        if (!user) {
          return done(new Error("User not found"));
        }
        let index;
        for (const key of request.rawHeaders) {
          if (key.includes("Bearer")) {
            index = request.rawHeaders.findIndex((element) => element === key);
          }
        }
        const token = request.rawHeaders[index];
        const userToken = "Bearer " + user.token;
        if (user.token === "" || userToken !== token) {
          return done(new Error("Unauthorized"));
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};

module.exports = {
  codeJWT,
  decodeJWT,
  verifyJWT,
  strategyJWT,
  setPassword,
  validPassword,
};

// [Symbol(kHeaders)]: {
//   host: 'localhost:3000',
//   'user-agent': 'insomnia/2023.2.1',
//   'content-type': 'application/json',
//   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmEwNzU4NWUwY2U5ZjhjNDUzMTVmNiIsImVtYWlsIjoicGlvdGVyMTJANDMyNGZkc2Zkcy5wbCIsImlhdCI6MTY5NDE2MDk4NSwiZXhwIjoxNjk0MTY0NTg1fQ.dm0TiXGUwbv07jnAvs3FGiSqIF1u12N3miGGhVDqPVg',
//   accept: '*/*',
//   'content-length': '88'
// },

// rawHeaders: [
//   'Host',
//   'localhost:3000',
//   'User-Agent',
//   'insomnia/2023.2.1',
//   'Content-Type',
//   'application/json',
//   'Authorization',
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmEwNzU4NWUwY2U5ZjhjNDUzMTVmNiIsImVtYWlsIjoicGlvdGVyMTJANDMyNGZkc2Zkcy5wbCIsImlhdCI6MTY5NDE2MDk4NSwiZXhwIjoxNjk0MTY0NTg1fQ.dm0TiXGUwbv07jnAvs3FGiSqIF1u12N3miGGhVDqPVg',
//   'Accept',
//   '*/*',
//   'Content-Length',
//   '88'
// ],
