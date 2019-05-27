// const App = require('../model/app.model.js');


// // Create and Save a new field
// exports.create = (req, res) => {
//     // Validate request
//     if (!!req.body.content) {
//         return res.status(400).send({
//             message: "Data content can not be empty"
//         });
//     }
   
//     // Create a fields object
//     const login_fields = new App.fourth({
//         email: req.body.email,
//         password:req.body.password
      
//     });

//     // Save fields in database
//     login_fields.save((err, response) => {
//         if (err) {
//             res.send(err)
//         }
//         else {
//             res.send(response)
//             console.log(req.body);
//         }
//     })

// };
