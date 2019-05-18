const express = require('express')
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const mysql = require("mysql")
const nodemailer = require('nodemailer');
const md5 = require('md5');
const app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connection database
var Sequelize = require('sequelize');
var sequelize = new Sequelize('user', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',   //choose anyone between them
    define: {
     freezeTableName: true //agar saat membuat table tidak ada tambahan 's' di table namenya
   },
  // To create a pool of connections
  pool: {max: 5,min: 0,idle: 10000},
});


var con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "user"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

passport.use("login",new LocalStrategy(
{
    passReqToCallback : true
  }, function(req, username, password, done) {
    var snapshot = req.body;
    var username = " ";
    var password = " ";
    if(snapshot.username != null){username = snapshot.username}
    if(snapshot.password != null){password = snapshot.password}
    var passcode = md5(password);

    if(username !='' && password != ''){
      sequelize.query("SELECT * FROM sign_in where username='"+username+"' and password='"+passcode+"' ", {type: Sequelize.QueryTypes.SELECT}).then(myTableRows => { //type: Sequelize.QueryTypes.SELECT agar saat select tidak double response
         if (myTableRows.length > 0) {
         return done(null,req.body);
       } else {
         return done(null, false)
       }

       });
    }else{
      return done(null, false, { message: 'Incorrect email.' });
      }

  }));

passport.use("signup",new LocalStrategy(
{
    passReqToCallback : true
  }, function(req, username, password, done) {


    var snapshot = req.body;
    var username = " ";
    var password = " ";
    var email = " ";
    var nama_usaha = " ";
    var alamat_usaha = " ";
    var kota = " ";
    var provinsi = " ";
    var kode_pos = " ";
    var no_telp = " ";
    if(snapshot.username != null){username = snapshot.username}
    if(snapshot.password != null){password = snapshot.password}
    if(snapshot.email != null){email = snapshot.email}
    if(snapshot.nama_usaha != null){nama_usaha = snapshot.nama_usaha}
    if(snapshot.alamat_usaha != null){alamat_usaha = snapshot.alamat_usaha}
    if(snapshot.kota != null){kota = snapshot.kota}
    if(snapshot.kode_pos != null){kode_pos = snapshot.kode_pos}
    if(snapshot.no_telp != null){no_telp = snapshot.no_telp}
    if(snapshot.provinsi != null){provinsi = snapshot.provinsi}
    var passcode = md5(password);

    if(username !='' && password != ''){
      sequelize.query("INSERT INTO `sign_in` (`username`, `email`, `password`, `nama_usaha`, `alamat_usaha`, `kota`, `provinsi`, `kode_pos`, `no_telp`) VALUES ('"+username+"', '"+email+"', '"+passcode+"', '"+nama_usaha+"', '"+alamat_usaha+"', '"+kota+"', '"+provinsi+"', '"+kode_pos+"', '"+no_telp+"');");
      sequelize.query("SELECT * FROM sign_in where username='"+username+"' and password='"+passcode+"' ", {type: Sequelize.QueryTypes.SELECT}).then(myTableRows => { //type: Sequelize.QueryTypes.SELECT agar saat select tidak double response
        if (myTableRows.length > 0) {
        return done(null,snapshot);
      } else {
        return done(null, false)
      }
      
      });
    }else{
      return done(null, false, { message: 'Incorrect email.' });
      }

  }));


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());


app.post('/respass', function (req, res) {
  var snapshot = req.body;
  var email = "";
  if(snapshot.email != null){email=snapshot.email;} 
  sequelize.query("SELECT id FROM sign_in WHERE email='"+email+"' ",{ type: Sequelize.QueryTypes.SELECT }).then(myTableRows => {
  console.log(myTableRows);

  var id=myTableRows;
  console.log(id);
     var transporter = nodemailer.createTransport({
      service: 'zoho',
      auth: {
          user: 'username123710@zoho.com',
          pass: 'zidan3103117328',
      }
    });
    var mailOptions = { 
      from: 'username123710@zoho.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: ' <a href=" https://localhost:1331/reset?id='+id+' ">Klik Disini</a>'
    };
    transporter.sendMail (mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
    });
})
        
    res.send("Check your email");
});

app.post('/updatepass', function(req, res){
  var snapshot = req.body;
  var email = "";
  var password = "";
  if(snapshot.email != null){email=snapshot.email}
  if(snapshot.password != null){password=snapshot.password}
  var passcode = md5(password);

  sequelize.query("UPDATE `sign_in` SET `password` = '"+passcode+"' WHERE `sign_in`.`email` = '"+email+"' ")
  console.log('wikwik');
  res.redirect('https://google.com')
})

app.get('/succsess', function (req, res) {
  res.redirect('https://tapcredit.id');
});

app.get('/login', function (req, res, user) {
  res.render('login1.pug');
});

app.get('/reset', function (req, res, user) {
  res.render('reset1.pug');
});

app.get('/', function (req, res, user) {
  res.render('signup1.pug');
});

app.get('/forgot', function (req, res, user) {
  res.render('forgot1.pug');
});

//CSS
app.get('/main', function(req, res){
  res.sendfile('views/main.css');
});

app.get('/second', function(req, res){
  res.sendfile('views/second.css');
});

app.get('/third', function(req, res){
  res.sendfile('views/third.css');
});

app.post('/signup',
passport.authenticate('signup', { successRedirect: '/succsess',
                                 failureRedirect: '/'})
);

app.post('/loginsuccsess',
passport.authenticate('login', { successRedirect: '/succsess',
                                 failureRedirect: '/login'})
);

app.listen(1331, function () {
  console.log('Example app listening on port 1331 !');
});