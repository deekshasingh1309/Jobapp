const job_route = require('../model/app.model.js');
const mongoose = require('mongoose');

const enums = require('../enum');

// Create and Save a new field in job collection
exports.create = (req, res, next) => {

    if (!!req.body.content) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    // job_route.first.findOne({'name': req.body.company_name}, (err,res) => {
    //     console.log(req.body);
    // //    if(res.roles !== 3) return next(err);
    // })
    const fields_job = new job_route.second({
        job_profile: req.body.job_profile,
        company_name: req.body.company_name,
        job_description: req.body.job_description,
        job_expire_on: req.body.job_expire_on,
        city: req.body.city,
        salary: req.body.salary
    });

    fields_job.save((err, response) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(response)
        }
    })
}

    exports.findAll = (req, res) => {
        var skills=req.query.skills
        var newdata=[]
        count=0
        recentdata=[]
        skills=skills.map((data)=>JSON.parse(data))
        job_route.second.find((err, data) => {
            if (err) {
                res.status(404).send({
                    message: err.message || "Error occured on retrieving Data"
                });
            }
            else {
                data.map((jobdata,index)=>
                {
                    count=0
                    console.log("current job being matched",jobdata)
                    jobdata.job_description.map((jobskills,index2)=>
                    {
                        skills.map((userskills,index3)=>
                        {
                            if(jobskills.id===userskills.id)
                            {
                            count++
                            }
                        })     
                    })
                    if(count>0)
                    {
                        newdata.push({ count: count, job:jobdata})
                    }
                    console.log('count',count)
                   
                })
                var sortedarray=newdata.sort(function (a1, a2) {
                    if(a1.count!==a2.count)
                    {
                    return a2.count - a1.count
                    }
                    else
                    {
                        return a2.time-a1.time
                    }
                })
                sortedarray.map((data)=>
                {
                    recentdata.push(data.job)
                })
                total=recentdata.length

              //  console.log('new array', sortedarray)
                res.send(recentdata)
            }
        })
    }

    // // Only admin and company can add a job 
    // job_route.first.find({ 'id': req.params.id }).then(response => {   //finding details by user id 
    //     if (response[0].roles == enums.roles.admin) {                 // comparing if role is admin 
    //         fields_job.save((err, response) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 res.send(response)
    //             }
    //         })

    //     }
    //     else if (response[0].roles == enums.roles.company) { // checking if role is company
    //         fields_job.save((err, response) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 res.send(response)
    //             }
    //         })

    //     }
    //     else {
    //         res.send({ message: 'user cannot add a job' })
    //     }
    // })



// exports.findAll = async (_req, res) => {
//     var userdata = await job_route.first.find({});
//     var jobdata = await job_route.second.find({});
//     console.log('userData', userdata);
//     console.log('jobdata', jobdata);
//     // let x = jobdata.filter((newval)=> {
//     //     console.log(userdata.skills.indexOf(newval.job_description))
//     //     return  userdata.skills.indexOf(newval.job_description)!== -1
//     // })

//     let obj = {};
//     let arr = [];

//     // console.log('x',x);
//     jobdata.map((val, i) => {
//         var indexdata = [];

//         var count = 0;
//         // let 
//         console.log('val', val.job_description)
//         val.job_description.map((tech) => {
//             console.log('tech', tech)
//              console.log('userdata.',userdata)
//             if (userdata.skills) {
//                 console.log('inside if')
//                 if (userdata.skills[i].id.includes(item => item.text === tech)) {
//                     console.log('im in')
//                     count++
//                 }
//                 obj['count'] = count || 0;
//             obj['myVAL'] = val || 0;
//             // console.log(obj)
//             arr.push('obj', obj);

//             console.log('i', count);

//             }


            
//         })
//     })
//     console.log('arr', arr);

//     res.send(arr)
// }
// // Retrieve and return all fields from database.
// exports.findAll = (_req, res) => {
//     job_route.second.find()
//         .then(test1 => {
//             res.send(test1);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "error occurred"
//             });
//         });
// };


//skill based sorting for display most matched on top
// exports.findSkillsJobs = (_req, res) => {
//     job_route.second.find() && job_route.first.find()
//         .then(test1 => {
//             let count=0
//             if(req.body.skills === req.body.job_description)
//             res.send(test1);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "error occurred"
//             });
//         });
// };

//update jobs
exports.update = (req, res) => {
    console.log('req.body',req.body);
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "content cannot be empty"
        });
    }

    // Find id and update it if there is any change in the status
    let updateBody = {
        "city" : req.body.city,
        "job_expire_on" : req.body.job_expire_on,
        "job_profile" : req.body.job_profile,
        "salary" : req.body.salary
    }
    job_route.second.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.jobId) }, { $set: updateBody }, {upsert: true,new:true }, (err, response) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(response);
        }
    });
};


// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         return res.status(400).send({
//             message: "content cannot be empty"
//         });
//     }

//     // Find id and update it if there is any change in the status
//     job_route.second.findOneAndUpdate({ 'job_id': req.params.id }, { $set: req.body }, { new: true })
//         .then(fields_job => {
//             if (!fields_job) {
//                 return res.status(404).send({
//                     message: "Not found with id " + req.params.id
//                 });
//             }
//             res.send(fields_job);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Not found with id " + req.params.id
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating with id " + req.params.id
//             });
//         });
// };

// Delete user details
exports.delete = (req, res) => {
    job_route.second.findByIdAndRemove(req.params.id)
        .then(fields_job => {
            if (!fields_job) {
                return res.status(404).send({
                    message: "Data not found" + req.params.id
                });
            }
            res.send({ message: "Deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'Not Found') {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete field with id " + req.params.id
            });
        });
};


