var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//user schema
var ChildSchema = new mongoose.Schema({
    childname: String,
    gender: String,
    dob: Date,
    fathersname: String,
    mobilenumber: String,
    address: String,
    fathersoccupation: String,
    placeofbirth: String,
    nameofhospital: String
}, { autoIndex: true });
ChildSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Child", ChildSchema);

