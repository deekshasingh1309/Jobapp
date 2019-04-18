module.exports = (app) => {
    const test = require('../controller/app.controller.js');
    const test1 = require('../controller/job.controller.js');
    const test2 = require('../controller/apply.controller.js');

    // For user collection
    app.post('/naukriapp', test.create); // Create user

     app.get('/user', test.findAll);  // Retrieve users

  
    app.put('/user/:id', test.update);  // Update user

   
    app.delete('/user/:id', test.delete);   // Delete user

    //For job collection
    app.get('/jobs', test1.findAll);  // Retrieve job collection

    app.post('/createjobs/:id', test1.create); // Create jobs

    app.put('/jobs/:id', test1.update);  // Update jobs

    app.delete('/jobs/:id', test1.delete);   // Delete jobs
    
    //For apply collection
 //   app.get('/apply', test2.findAll);  // Retrieve apply

    app.post('/apply/:id', test2.create); // Create apply

    app.put('/applyn/:id/:userid', test2.update);  // Update jobs

}