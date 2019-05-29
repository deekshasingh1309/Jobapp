const mongoose = require('mongoose');

enums = require('../enum');

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
    time : { type : Date, default: Date.now } 
});

//apply collection schema
const applySchema = mongoose.Schema({
        user_id: { type: String, required: true},
        job_id: { type: String, required: true, max: 100 },
        company_name: { type: String, required: true },
        job_profile: { type: String, required: true },
        city:{ type: String, required: true },
        status: {type: Number, default:10}
});

//export all schemas
module.exports = {
    first: mongoose.model("user", userSchema), //user schema
    second: mongoose.model("jobs", jobSchema),  //job Schema
    third: mongoose.model("apply", applySchema), // apply schema
 
};