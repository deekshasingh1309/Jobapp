const App = require('../model/app.model.js');
const enums = require('../enum');

// Create and Save a new field
exports.create = (req, res) => {
    // Validate request
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }
    // Create a fields object
    const fields = new App.first({
       
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        phone: req.body.phone,
        skills:req.body.skills,
        roles: enums.roles['user']
    });

    // Save fields in database
    fields.save((err, response) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(response)
        }
    })

};
//
exports.findOne = async (req, res) => {
    const data = App.first.findOne({ 'email': req.body.email,'password':req.body.password }, (err, response) => {
    if (err) {
    console.log(data)
    res.status(404).send({
    message: err.message || "Some error occured while Fetching Data From database"
    });
    }
    else {
    res.send(response)
    
    }
    })
    
    };

// Retrieve and return all fields from database.
exports.findAll = (_req, res) => {
    App.first.find()
        .then(test => {
            res.send(test);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error occurred"
            });
        });
};


//update
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    // Find id and update it 
    App.first.findOneAndUpdate({ 'id': req.params.id }, { $set: req.body }, { new: true })
        .then(fields => {
            if (!fields) {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            res.send(fields);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating with id " + req.params.id
            });
        });
};


// Delete user
exports.delete = (req, res) => {
    App.first.findByIdAndRemove(req.params.id)
        .then(fields => {
            if (!fields) {
                return res.status(404).send({
                    message: "Data not found with id " + req.params.id
                });
            }
            res.send({ message: "Deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete field with id " + req.params.id
            });
        });
};


