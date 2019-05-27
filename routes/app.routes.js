module.exports = (app) => {
    const test = require('../controller/app.controller.js');
    const test1 = require('../controller/job.controller.js');
    const test2 = require('../controller/apply.controller.js');
   // const test4 = require('../controller/login.controller');

    // For user collection
    app.post('/naukriapp', test.create); // Create user and post the details of users

    app.get('/user', test.findAll);  // Retrieve all users

    app.put('/user/:id', test.update);  // Update user

    app.delete('/user/:id', test.delete);   // Delete user from collection


    //For job collection
    app.get('/jobs', test1.findAll);  // Retrieve job collection

    //app.post('/createjobs/:id', test1.create); // Create jobs

    app.post('/createjobs', test1.create); // Create jobs

    app.put('/updatejobs', test1.update);  // Update jobs

    app.delete('/jobs/:id', test1.delete);   // Delete jobs


    //For apply collection
    app.get('/apply/:company_id', test2.findAll);  // Company can retrieve all the users who have applied in their company

    app.post('/apply/:id', test2.create); // Create apply only for users

    app.put('/applyn/:id/:userid', test2.update);  // Update jobs


     //for login collection
    // app.post('/login', test4.create); // Create login and post login details

     app.post('/sign', test.findOne);
}