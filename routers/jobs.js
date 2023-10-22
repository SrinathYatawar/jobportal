const { response } = require('express');
const express =require('express');
const Jobs = require('../database/models/Jobs')
const User = require('../database/models/Users')

const router=express.Router();

//to add more jobs to board

  router.post('/add/jobs', async (req, res) => {
    console.log(req.body)
       const job = Jobs(req.body)
       job.save();
       res.send(job)
  });

// to fetch all jobs posting

router.get('/jobs', async (req, res) => {
    try {
      // Use Mongoose to fetch all jobs from the database
      const jobs = await Jobs.find();
  
      // Respond with the job data in JSON format
      res.json(jobs);
    } catch (error) {
      // Handle any errors, such as database connection issues
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  //applied jobs saved in database

router.post('/jobs/apply', async (req, res) => {
  try {
    const { userId, title, salary, category } = req.body; // Assuming these fields are sent in the request body

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create an application object
    const application = {
      title,
      salary,
      category,
      appliedDate: new Date(), // You can set the application date to the current date
    };

    // Push the application to the user's applications array
    user.Applied.push(application);

    // Save the user to update their applications array
    await user.save();

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/jobs/applied/:userId', async (req, res) => {

  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve the applied jobs from the user's model
    const appliedJobs = user.Applied;

    res.status(200).json({ appliedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


  

module.exports=router;