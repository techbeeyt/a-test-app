var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  id: String,
  gender: String,
  age: String,
  education: String,
  country: String,
  ethnicity: String,
  socialmedia : String,
  genderSpecified : {type : String, required: false},
  educationSpecified : {type : String, required: false},
  questionSet : String,
  qOrder : {type : Array},
  code : {type : String, required: false}
});

var Result = mongoose.model('User', userSchema);

module.exports = Result;
