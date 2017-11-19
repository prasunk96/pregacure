var express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express(),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User       = require("./models/user"),
    flash      = require("connect-flash"),
    Child      = require("./models/child"),
    Apoint     = require("./models/apoint"),
    Doctor     = require("./models/doctor"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser");
    var session = require('express-session');
     var MongoClient = require('mongodb').MongoClient;
    const mongd_url = "mongodb://prasunk:prasunk1796@ds042607.mlab.com:42607/pragacare";
    const mongd_url_old = "mongodb://localhost/practice";
mongoose.Promise = global.Promise;
mongoose.connect(mongd_url, { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// app.use(cookieParser('secretString'));
// app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.Router());

app.use(require("express-session")({
    secret: "hell yaa i am the god",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

var flash_message=null;
app.get("/", function(req,res){
    res.render("landing", { messages:  flash_message });
    flash_message=null;
});

app.get("/ecell", function(req, res){
        res.render("ecell/index");
});
app.get("/ecell/users", function(req, res) {
    res.render("ecell/users", { messages: req.session.messages || null });
    req.session.messages = null;
});
app.get("/map", function(req, res) {
    res.render("map");
});
app.get("/landing", function(req, res) {
    res.render("landing", { messages: flash_message });
    flash_message=null;
});
app.get("/diet", function(req, res) {
    res.render("diet");
});
app.get("/chat", function(req, res) {
    res.render("chat");
});
//================================
//AUTH ROUTES
//=================================

app.get("/register", function(req, res) {
    res.render("register", { messages: flash_message });
    flash_message = null;
});
app.get("/vaccination", function(req, res) {
    res.render("vaccination");
});

app.post("/register" , function(req, res) {
    var newUser = new User({ username: req.body.username,
                                lastname: req.body.lastname,
                                password: req.body.password,
                                email: req.body.email,
                                phone: req.body.phone,
                                bg: req.body.bg,
                                age: req.body.age,
                                dob: req.body.dob,
                                address: req.body.address,
                                month: req.body.month,
                                city: req.body.city,
                                State: req.body.state,
                                doctor: req.body.doctor
                             });
    User.register(newUser , req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message );
            flash_message = err.message;
            return res.render("register", { messages: flash_message });
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Pregacare" + user.username);
            flash_message = "Welcome to Pregacare "+user.username;
            res.redirect("/ecell/users");
        });
    });
});

//LOGN IN ROUTE

app.get("/login", function(req, res) {
    res.render("login", { messages: req.session.messages || null });
    req.session.messages = null;
    flash_message = null;
});

app.get("/profile", function(req, res) {
    res.render("profile");
})

app.get("/certificate", function(req, res) {
    res.render("birth");
})
app.get("/appointment/:id", function(req, res) {
    res.render("appointment");
})

app.get("/find", function(req, res){
        Doctor.find({}, function(err, allDoctors){
            if(err){
                console.log(err);
            } else {
                res.render("find", {doctor: allDoctors});
            }
        });
});

//CREATE ROUTE 
app.post("/certificate", isLoggedIn, function(req, res) {
    var childname = req.body.childname;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var fathersname = req.body.fathersname;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var fathersoccupation = req.body.fathersoccupation;
    var placeofbirth = req.body.placeofbirth;
    var nameofhospital = req.body.nameofhospital;
    
    var newChild = {    childname: childname,
                        gender: gender,
                        dob: dob,
                        fathersname: fathersname, 
                        mobilenumber: mobilenumber,
                        address: address,
                        fathersoccupation: fathersoccupation,
                        placeofbirth: placeofbirth,
                        nameofhospital: nameofhospital
                    };
MongoClient.connect(mongd_url, function(err, db) {
      if (err) throw err;
    console.log("Database connected!");
    db.collection("Child").insertOne(newChild, function(err, response) {
        if (err) throw err;
            console.log("1 document inserted");
        db.close();
        res.redirect("/profile");
  });
});
    // var ch = new Child(newChild);
    // ch.save(function(err, newlyCreated){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.redirect("/profile");
    //     }
    // });
    // Child.create(newChild, function(err, newlyCreated){
        // if(err){
            // console.log(err);
        // } else {
            // res.redirect("/profile");
        // }
    // });
    
});

app.post("/appointment/:id", isLoggedIn, function(req, res){
    var name = req.body.name;
    var dob = req.body.dob;
    var age = req.body.age;
    var date = req.body.date;
    var timming = req.body.timming;
    var address = req.body.address;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var newApoint = {    
                         name: name,
                         age: age,
                         date: date,
                         timming: timming,
                         address: address,
                         mobile: mobile,
                         email:email
                    };
    // Apoint.create(newApoint, function(err, newlyCreated){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.redirect("/profile");
    //     }
    // });
    MongoClient.connect(mongd_url, function(err, db) {
      if (err) throw err;
             console.log("Database connected!");
            db.collection("Apoint").insertOne(newApoint, function(err, response) {
            if (err) throw err;
                console.log("1 document inserted");
            db.close();
            res.redirect("/profile");
  });
});
    
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/ecell/users",
    failureRedirect: "/login", 
    failureMessage: "Invalid username or password", 
    successMessage: "Successfully Logged In"
}), function(req, res){
});

//LOGOUT ROUTE

app.get("/logout", function(req, res) {
    req.logout();
    flash_message="Successfully Logged You Out!";   //<--see this
    req.flash("success", "Successfully Logged You Out!");
    // res.locals.message = req.flash();
    // console.log(req.flash('success'))
    res.redirect("/landing");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
});