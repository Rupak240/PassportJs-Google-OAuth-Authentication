const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "http://localhost:5000/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      //   passport callback function
      console.log(profile);
      //   Check if user already exists in the database
      const existAsUser = await User.findOne({ googleId: profile.id });
      if (existAsUser) {
        // Already have as user
        console.log("User is " + existAsUser);
        done(null, existAsUser);
      } else {
        // Create a New User in database
        const newUser = await new User({
          username: profile._json.name,
          googleId: profile.id,
          email: profile._json.email,
          thumbnail: profile._json.picture,
        }).save();

        done(null, newUser);
        console.log(newUser);
      }
    }
  )
);
