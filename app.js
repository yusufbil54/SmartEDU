const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const usersRoute = require('./routes/usersRoute');

const app = express();
const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/smartedu-db',
  collection: 'Sessions',
});
//Connect DB
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db', {
    /*userNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
  useCreateIndex:true*/
  })
  .then(() => {
    console.log('DB connected successfuly');
  }).catch((error) => console.log("Bağlantı oluşturulamadı.", error.message));

//Global Veriable
global.userIN = null;

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'My_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store,
  })
);
app.use(flash());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//Routes
app.use('*', (req, res, next) => {
  console.log("sunucu ilk "+req.session.userID);
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', usersRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
