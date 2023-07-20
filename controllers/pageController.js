const nodemailer = require("nodemailer");
exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendMail = async (req, res) => {
try{
  const outPutMessage=`
    <h1>Mail Details</h1>
    <ul>
      <li>name:${req.body.name}</li>
      <li>mail:${req.body.mail}</li>
    </ul>
    <h1>Message Details </h1>
    <p>${req.body.message}</p>
  `


  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "jackdaniels280720@gmail.com", // generated ethereal user
      pass: "euunazqpxyzugjgx", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart Edu Contact Form" <jackdaniels280720@gmail.com>', // sender address
    to: "yusufbil69@gmail.com", // list of receivers
    subject: "Smart Edu Contact Form New Message", // Subject line
    html: outPutMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
  req.flash("success","We Recevied Your Message Succesfully");
  res.status(200).redirect('contact');
}catch(err)
{
  req.flash("error","Something Happend!");
  res.status(400).redirect('contact');
}
};



