const express = require('express');//require express module files
const app  = express();

const keys = require('./config/keys');

//const mongoose = require('mongoose');
//mongoose.connect(keys.DB_KEY);

// app.get('/',(req,res)=>{
//   res.send({hi:'xiaocong'});
// });
if(process.env.NODE_ENV === 'production'){
  //Express will serve up production assests
  //like out main.js file.or main.css file
  //if specific file match the route

  app.use(express.static('client/dist'));

  //Express will serve up devlopment assests
  //if it doesn't recognize the rotue
  const path=require('path');
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'));
  });

}
const PORT = process.env.PORT||5000;
app.listen(PORT);


