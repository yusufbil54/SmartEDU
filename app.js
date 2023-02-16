const express = require('express');
const mongoose = require('mongoose');
const pageRoute=require('./routes/pageRoute');
const courseRoute=require('./routes/courseRoute');


const app = express();
//Connect DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/smartedu-db',{
  /*userNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
  useCreateIndex:true*/
}).then(()=>{
  console.log('DB connected successfuly');
});

//Template Engine
app.set("view engine","ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', pageRoute);
app.use('/courses',courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
