const passport = require("passport");

// Auth middleware, check if the user is authenticated
const auth = passport.authenticate("jwt", { session: false });

module.exports = auth;