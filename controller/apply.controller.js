const apply_route = require('../model/app.model.js');
var enums1 = require('../enum');

// data is posted and saved in apply collection
exports.create = (req, res) => {
    // Validate request
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    else{
        console.log(req.body)
        const fields_apply = new apply_route.third({
            user_id: req.body.user_id,
            job_id: req.body.job_id,
            company_name: req.body.company_name,
            job_profile: req.body.job_profile,
            city: req.body.city
        })
        fields_apply.save((err, resp) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(resp);
        }
    })
}
}

// Retrieve and return all fields from database.
exports.findAll = (req, res) => {
    apply_route.third.find({ company_name: req.params.company_name },(err,data)=>{
        if (err) {
        console.log(err)
        }
        else {
        res.send(data)
        }
    }) 
}

exports.find_applies = (req, res) => {
    apply_route.third.find({ 'user_id': req.params.user_id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('data found')
            res.send(data);
        }
    })
}
 

   // who all can apply
//     apply_route.first.find({ 'id': req.params.id }).then(response => {
//         if (response[0].roles == enums1.roles.user) { // checking if role is user
//             fields_apply.save((err, respo) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 else {
//                     res.send(respo)
//                 }
//             })

//         }
//         else {
//             res.send({ message: 'Only user can apply' })
//         }
//     }).catch(err => {
//         console.log(err);
//     });
// }


//WHO ALL CAN CHANGE THE STATUS
// exports.update = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Content cannot be empty"
//         });
//     }
//     apply_route.first.find({ 'id': req.params.id })
//         .then(response => {
//             if (response[0].roles == enums1.roles.company) {
//                 let status = req.body.status;
//                 let changedStatus = enums1.status[status];
//                 apply_route.third.findOneAndUpdate({ 'userid': req.params.userid }, { $set: { status: changedStatus } }, { new: true }, (err, respo) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         res.send(respo);
//                     }
//                 })
//             }
//             else {
//                 res.send({ message: 'you cannot update the status' });
//             }
//         }).catch(err => {
//             console.log(err);
//         });
// }


