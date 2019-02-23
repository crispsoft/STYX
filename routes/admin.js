const router = require('express').Router();
const passport = require('./../config/passport');

router.use(

  (req, res, next) => {
    console.log(`\n\t\t@routes/admin.js ${req.method.toUpperCase()} on ${req.baseUrl}${req.path} (${req.originalUrl})`);
    next();
  },

  /* //* No Cache
  (req, res, next) => {
    res.append('Surrogate-Control', "no-store");
    res.append('Cache-Control', "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.append('Pragma', "no-cache");
    res.append('Expires', "0");

    next();
  } */

);

router.get("/", (req, res) => {

  console.log("req.user", req.user);

  if (req.user) {
    console.log("sending auth only content");
    res.send("auth only content");
  }

  else {
    console.log("no req user")
    res.end();
  }

});



router.post('/login',

  //* Logout any current
  (req, res, next) => {
    req.logout();
    next();
  },

  //* Pre-Authenticate (check or build req.body)
  (req, res, next) => {
    if (!req.body || !req.body.password) {
      return next("No request body with password from POST");
    }
    req.body.username = process.env.ADMIN_ID;
    return next();
  },

  //* Authenticate check
  (req, res, next) => {
    passport.authenticate('local',
      // { session: false },
      (error, user, info) => {
        console.log('auth return:', error, user, info);

        if (error) {
          console.log("Authentication error:\n", error);
          return next({ error, info });
        }

        if (!user) {
          console.log("Authentication, falsey user, info:\n", info);
          return next({ info }); // as error
        }

        req.login(user, (err) => {
          if (err) { return next(err); }
          return next();
        });
      })(req, res, next);
  },

  //* Post-Authenticate check - with ERRORS
  (err, req, res, next) => {
    console.log('post-auth, err:\n', err);
    return res.status(500).send("Could not authenticate.");
  },

  //* Post-Authenticate check - WITHOUT errors
  (req, res, next) => {
    console.log('post-auth, no err', req.user);
    /* if (req.user) {
      return res.status(401).end();
    } */
    //? Better just to refresh/redirect, instead of 401?
    //? Case: while currently admin, but then trying to login POST with BAD credentials
    //? only 401'ing the response would still show current page with admin sections, even though they just tried bad credentials

    return res.redirect('.');
  }
)


module.exports = router;
