const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOption = session({
        secret:"mySuperSecretString",
        resave:false,
        saveUninitialized:true,
    });

app.use(sessionOption);
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous")
    {
        req.flash("error","User Not Registered !");
    }
    else{
        req.flash("success","User Registered Successfully !");
    }
    res.send(name);
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
   // res.render("page.ejs",{name:req.session.name , msg:req.flash("success")});
});

app.get("/request",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }

    else {
            req.session.count=1;
    }
    res.send(`You Send a request ${req.session.count} times`);
})

app.get("/test",(req,res,next)=>{
    res.send("Test Successfully");
});


app.listen(3000,()=>{
    console.log("Server Is Listening To Port 3000");
});