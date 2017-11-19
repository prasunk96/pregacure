var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//user schema
var apointSchema = new mongoose.Schema([
    
                         { type: mongoose.Schema.Types.ObjectId,
                         ref: "Users" },
                         {
                         name: String,
                         age: String,
                         date: Date,
                         timming: String,
                         address: String,
                         mobile: String,
                         email:String }
]);
apointSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Apoint", apointSchema);

