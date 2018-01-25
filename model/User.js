const mongoose  = require('mongoose');
const Schema  = mongoose;

const userSchema = new Schema({
  id:Number,
  name:String
});

mongoose.model('users',userSchema);