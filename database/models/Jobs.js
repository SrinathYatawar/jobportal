const mongoose =require('mongoose');

const JobSchema=new mongoose.Schema({
     title:{
        type: String,
        required: true
     },
     company:{
        type:String,
        required: true,
     },
     location:{
        type: String,
        required: true
     },
     description:{
        type: String,
        required: true
     },
     requirements:{
        type:String,
        required: true,
     },
     postedAt:{
        type: String,
        required: true
     },
     deadline:{
        type: String,
     },
     type:{
        type:String,
        required: true,
     },
     category:{
        type: String,
     },
     salary:{
        type: String,
        required: true
     }
    
  });
   
  const Jobs=mongoose.model('job',JobSchema);

  module.exports=Jobs;