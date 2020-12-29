const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passportSetup");
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')

const app = require("express")();

// Set up view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect DB
const connectDb = async () => {
  mongoose.connect(
    keys.mongo.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to MongoDB.")
  );
};

connectDb();

// Set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}.`));
