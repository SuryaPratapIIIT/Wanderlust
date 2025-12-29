require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ======================
// ENV VARIABLES
// ======================
const dbUrl = process.env.ATLASDB_URL;
const secret = process.env.SECRET;

if (!dbUrl) {
  console.error("❌ ATLASDB_URL not defined");
}
if (!secret) {
  console.error("❌ SECRET not defined");
}

// ======================
// DATABASE CONNECTION
// ======================
mongoose
  .connect(dbUrl)
  .then(() => console.log("✅ Connected To MongoDB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ======================
// SESSION STORE
// ======================
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});

store.on("error", (e) => {
  console.log("❌ SESSION STORE ERROR", e);
});

const sessionOptions = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// ======================
// APP CONFIG
// ======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionOptions));
app.use(flash());

// ======================
// PASSPORT CONFIG
// ======================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// GLOBAL MIDDLEWARE
// ======================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ======================
// ROOT ROUTE (IMPORTANT 🔥)
// ======================
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// ======================
// ROUTES
// ======================
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ======================
// 404 HANDLER
// ======================
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// ======================
// ERROR HANDLER (ONLY ONE)
// ======================
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// ======================
// SERVER (RENDER SAFE)
// ======================
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
