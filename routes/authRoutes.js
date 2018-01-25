const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports=app=>{
  app.post('/api/users',function(req,res){
    User.create({
      email: req.body.email,
      password:req.body.password,
    },function(err,user){
      if(err)
        res.send(err);
    });
  });
}