var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//user schema
var UserSchema = new mongoose.Schema({
    username: String,
    lastname: String,
    password: String,
    email: String,
    phone: String,
    bg: String,
    age: String,
    dob: Date,
    address: String,
    month: Date,
    city: String,
    State: String,
    doctor: String
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

