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
        status: enums1.status[req.body.status]
    });

    // who all can apply
    apply_route.first.find({ 'id': req.params.id }).then(response => {
        if (response[0].roles == enums1.roles.user) { // checking if role is user
            fields_apply.save((err, respo) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(respo)
                }
            })

        }
        else {
            res.send({ message: 'Only user can apply' })
        }
    }).catch(err => {
        console.log(err);
    });
}


//WHO ALL CAN CHANGE THE STATUS
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    apply_route.first.find({ 'id': req.params.id })
        .then(response => {
            if (response[0].roles == enums1.roles.company) {
                let status = req.body.status;
                let changedStatus = enums1.status[status];
                apply_route.third.findOneAndUpdate({ 'userid': req.params.userid }, { $set: { status: changedStatus } }, { new: true }, (err, respo) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(respo);
                    }
                })
            }
            else {
                res.send({ message: 'you cannot update the status' });
            }
        }).catch(err => {
            console.log(err);
        });
}


// Retrieve and return all fields from database.
exports.findAll = (req, res) => {
    apply_route.third.findOne({ 'company_id': req.params.company_id }).then((response) => {
        return apply_route.first.findOne({ 'user_id': response.user_id }).then((response2) => {
            res.json(response2)
        })

    }).catch((err) => {
        console.log(err)

    })

}

