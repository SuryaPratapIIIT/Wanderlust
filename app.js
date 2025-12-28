require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http"); // NEW
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const ListingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;
const secret = process.env.SECRET;

// --- 1. Database Connection ---
main().then(() => console.log("Connected To DB"))
      .catch((err) => console.log("DB Connection Error:", err));

async function main() {
  await mongoose.connect(dbUrl);
}

// --- 2. MongoStore Setup ---
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});
store.on("error", (e) => console.log("SESSION STORE ERROR", e));

// --- 3. Session Options ---
const sessionOption = {
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true
  },
};

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(session(sessionOption));
app.use(flash());

// --- 4. Passport Setup ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// --- 5. Routes ---
app.use("/listings", ListingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// --- 6. Error Handling ---
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  if (res.headersSent) return next(err);
  res.status(statusCode).render("error.ejs", { err, currUser: req.user || null });
});

// --- 7. Serverless Export for Vercel ---
module.exports = app;
module.exports.handler = serverless(app);
