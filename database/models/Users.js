const mongoose =require('mongoose');

const applicationSchema = new mongoose.Schema({
   title: String,
   salary: String,
   category: String,
   appliedDate: Date,
 });

const UserSchema=new mongoose.Schema({
     name:{
        type: String,
        required: true
     },
     email:{
        type:String,
        required: true,
        unique: true
     },
     password:{
        type: String,
        required: true
     },
     date:{
      type: Date,
      default: Date.now()
     },
     Applied:[applicationSchema]
  });
   
  const Users=mongoose.model('user',UserSchema);

  module.exports=Users;