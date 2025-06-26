const mongoose = require('mongoose');


//Definamos el esquema del usuario

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password :{
    type:String,
    required:true
  },
  description: {
    type: String,
    default: ''
  }
});
module.exports = mongoose.model('User', userSchema);