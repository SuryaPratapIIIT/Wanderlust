if(process.env.NODE_ENV !="production"){
  require('dotenv').config()
}
console.log(process.env.SECRET)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



const ListingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


const sessionOption = {
  secret : "mysupersecretcode" ,
  resave : false,
  saveUninitialized:true,
  cookie:{
    expires : Date.now() + 7*24*60*60*60 ,
    maxAge  : 7*24*60*60*60,
    httpOnly : true
  },
};
// mongoose.connect('mongodb://localhost:27017/wanderlust');


const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// EJS Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}


// ROOT Route
app.get("/", (req, res) => {
  res.send("Hi, I am Root");
});


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});

// app.get("/demouser",async (req,res)=>{
//   let fakeUser=new User({
//     email:"student@gmail.com",
//     username:"delta-student"
//   });
//   let registeredUser= await User.register(fakeUser,"helloworld");
//   res.send(registeredUser);
// });

app.use("/listings",ListingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


//REVIEWS Route ----> POST REVIEW Route


// 404 Handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs",{err});
 // res.status(statusCode).send(message);
});

// Server Start
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

