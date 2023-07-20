const User = require('../models/Users');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.createUsers = async (req, res) => {
  try {
    const users = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors=validationResult(req);
    for(let i=0; i<errors.array().length; i++)
    {
      req.flash("error",`${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
            // USER SESSION
            if(same)
            {
              req.session.userID=user._id;
              const token=createToken(user._id);
              res.cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60*24*7});
              res.status(200).redirect('/');
            }else
            {
              req.flash("error","Your password is not correct!");
              res.status(400).redirect('/login');
            }
        });
      }else
      {
        req.flash("error","User is not exist!");
        res.status(400).redirect('/login');
      }
    });
  } catch (err) {

  }
};

exports.logoutUser=(req,res)=>{
    res.clearCookie('jwt');
  req.session.destroy(()=>{
    res.redirect('/');
  })
};

exports.getDashboardPage = async(req, res) => {
  const user= await User.findOne({_id:req.session.userID}).populate('courses');
  const categories= await Category.find();
  const courses=await Course.find({user:req.session.userID})
  const users= await User.find();
  res.status(200).render('dashboard', {
    user,
    categories,
    courses,
    users,
    page_name: 'dashboard',
  });
};

exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({user:req.params.id});
    res.status(200).redirect('/users/dashboard');
  } catch(error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


const createToken = (id) => {
  return jwt.sign({id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

