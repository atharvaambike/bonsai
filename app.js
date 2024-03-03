require("dotenv").config(); //put this line at the top of document
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const ejs=require("ejs");
const passport=require("passport")
// const LocalStrategy=require("passport-local");
const session=require("express-session");
const mongoose=require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportLocalMongoose=require("passport-local-mongoose");
const findOrCreate=require("mongoose-findorcreate");
app.use(session({
    secret:"our Little Secret",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize()); //tell app to initialize passport package;
app.use(passport.session()); // by using passport use session (telling passport to use session)



// mongoose.connect("mongodb://127.0.0.1:27017/BonsaiDb");
//used mongodb Atlas server for database
mongoose.connect("mongodb+srv://vipul1704:Vipulpatil1704@cluster0.erxehxi.mongodb.net/BonsaiDb");
//delete everthing from net to our db
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

const userSchema=new mongoose.Schema({
    email:String,
    password:String,
    mobileNo:String,
    age:String,
    googleId:String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User=mongoose.model("User",userSchema);
passport.use(User.createStrategy());
//applicable only for local strategy not for google
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



//applicable for all
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

//Google Strategy


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" //used to remove google+api deprecation warning
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));  //2nd parameter defines what we want from google when user successfully authenticcated as in local strategy after successfull authentication ,authenticatedd user from db gets attached to req.user same here if user successfully authenticated it's we got profile

app.get('/auth/google/home', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("successfully Logged in");
  });



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/login",function(req,res){
        if(req.isAuthenticated())
        { 
            //   console.log(req.user);
            res.send("successfully Logged in"); 
        }
        else {
            res.render("login");
        }
      
   
})
app.get("/register",function(req,res){
    res.render("register");
})

app.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            res.send(err);
        }
        else {
            res.send("successfully Logged Out");
        }
    });
})
app.post("/",function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    console.log(email);
    console.log(password);
})
app.post("/register",function(req,res){
    User.register({username:req.body.username,mobileNo:req.body.mobileNo,age:Number(req.body.age)},req.body.password,function(err,user){
        if(err){
            res.redirect("/register");
        }
        else {
            console.log(user);
            passport.authenticate("local")(req,res,function(){
                res.send("successfully registered");
            })
          
        }
    })
})
app.post("/login",function(req,res){
    
    const user=new User({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user,function(err){
         if(err){
            res.send(err);
         }
         else {
            passport.authenticate("local")(req,res,function(){
              res.send("successfully authenticated");
              console.log(req.user);
            })
            //NOTE: if authenticate method authenticates then it calls implicitly which sets the authenticated user which found from db to req property but if authentication fails still above login method already set's the unauthorized user to req property so we need to remove that 
            // for that usse logout function which clears the users 
            req.logout(function(err){
                console.log(err);
            })
         }
    })
})

app.listen(3000,function(){
    console.log("server is started on server 3000");
})