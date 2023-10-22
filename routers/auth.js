const { response } = require('express');
const express =require('express');
const User = require('../database/models/Users')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

require('dotenv').config()

const router=express.Router();


//signup route

router.post('/createuser', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
  
    try {
      // Check if the email is unique before saving the user
      const existingUser = await User.findOne({ email: user.email });
  
      if (existingUser) {
        // Email is not unique, return an error response
        return res.status(400).json({ error: 'Email is already in use' });
      }
  
      // Email is unique, proceed with user registration
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.Key, { expiresIn: '1h' });

      // Return the user and token as a response
      res.json({token});

    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  });


  //login route

  router.post('/login', async (req, res) => {

    const { email, password } = req.body;
  
    try {
      // Check if a user with the given email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
      }
  
      // Check if the provided password matches the stored password
      const isPasswordValid =  (user.password === password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Wrong password' });
      }
  
      // User is authenticated, generate a JWT token
      const token = jwt.sign({ userId: user._id },  process.env.Key, { expiresIn: '1h' });

      res.json(token);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

 //get userroute

 router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
 

  

module.exports=router;