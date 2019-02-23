const   passport   = require('passport');
const { Strategy } = require('passport-local');

passport.use(
  new Strategy(
    (username, password, done) => {
      if (username !== process.env.ADMIN_ID) {
        return done(null, false, { message: "Wrong admin ID."});
      }
      if (password !== process.env.ADMIN_PW) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, { adminSuccess: true });
    }
  ));


passport.serializeUser( (user, done) => {
  done(null, user.adminSuccess);
});

passport.deserializeUser( (id, done) => {
  if (!id) {
    done({message: "Error at deserializeUser"});
  }

  done(null, { adminSuccess: true });
});


module.exports = passport;