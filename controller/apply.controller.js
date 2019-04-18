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
    const fields_apply = new apply_route.third({
        company_id: req.body.company_id,
        userid: req.body.userid,
        status:enums1.status[req.body.status]
    });

    apply_route.first.find({'id':req.params.id}).then(response=>{
        if(response[0].roles==enums1.roles.user){
            fields_apply.save((err, respo) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(respo)
                }
            })

        }
        else{
            res.send({message:'Only user can apply'})
        }
    })
}


//WHO ALL CAN CHANGE THE STATUS

exports.update=(req,res)=>{
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    apply_route.first.find({'id':req.params.id})
    .then(response=>{
        if(response[0].roles==enums1.roles.company){
            let status=req.body.status;
            let changedStatus=enums1.status[status];
            apply_route.third.findOneAndUpdate({'userid':req.params.userid}, { $set: {status:changedStatus} },{ new: true }, (err,respo)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(respo);
                }
            })
        }
        else{
            res.send({message:'you cannot update the status'});
        }
    }).catch(err=>{
        console.log(err);
    });
}


// Retrieve and return all fields from database.
exports.findAll = (_req, res) => {

    apply_route.second.find({'id':req.params.company_name}).then(response=>{
        if(response[0].roles==enums1.roles.user){
            fields_apply.save((err, respo) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(respo)
                }
            })

        }
    // apply_route.third.find()
    //     .then(test2 => {
    //         res.send(test2);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "error occurred"
    //         });
    //     });
})
}