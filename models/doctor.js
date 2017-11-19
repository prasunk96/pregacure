var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//user schema
var DoctorSchema = new mongoose.Schema({
    image: String,
    name: String,
    degree: String,
    fee: String
});
DoctorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", DoctorSchema);

