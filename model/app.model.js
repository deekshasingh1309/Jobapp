const mongoose = require('mongoose');

//enums = require('../enum');

//user collection schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String, required:true},
    phone: { type: Number, required: true },
    skills:{type:Array, required:true},
    roles: { type: Number, required: true }

});


// const loginSchema = mongoose.Schema({
//     email: { type: String, required: true },
//     password:{type:String, required:true}
// });


//Job collection schema
const jobSchema = mongoose.Schema({
    job_profile: { type: String, required: true },
    company_name: { type: String, required: true },
    job_description: { type: Array, required: true },
    job_expire_on: { type: String, required: true },
    city:{type:String, required: true},
    salary: { type: Number, required: true },
     time : { type: Number, default: (new Date()).getTime() } 
});
//jobSchema.index({ company_location: "2dsphere" });


//apply collection schema
const applySchema = mongoose.Schema({
    company_id: { type: Number, required: true },
    userid: { type: Number, required: true },
    status: { type: String, required: true },
});


//export all schemas
module.exports = {
    first: mongoose.model("user", userSchema), //user schema
    second: mongoose.model("jobs", jobSchema),  //job Schema
    third: mongoose.model("apply", applySchema), // apply schema
 
};