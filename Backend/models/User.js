const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  temporarytoken:{
    type: String,
    required: true
  },
  active:{
    type: Boolean,
    required: true,
    default: false
  },
  admin:{
    type: Boolean,
    default: false,
  }
});


module.exports =  mongoose.model('User', UserSchema);