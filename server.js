var express = require('express');
var session = require('express-session');
var app = express()
 
app.get('/hello', function (req, res) {
  res.send('Hello World')
})

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/view/index.html')
})
app.get('/style', function (req, res) {
  res.sendFile(__dirname + '/view/style.css')
})
app.get('/jquery', function (req, res) {
  res.sendFile(__dirname + '/view/jquery.js')
})
app.get('/jquery-md5', function (req, res) {
  res.sendFile(__dirname + '/view/jquery-md5.js')
})
app.get('/navigation', function (req, res) {
  res.sendFile(__dirname + '/view/navigation.html')
})
app.get('/navcss', function (req, res) {
  res.sendFile(__dirname + '/view/nav.css')
})

app.get('/orderid', function (req, res) {
  res.sendFile(__dirname + '/view/orderid.html')
})
app.get('/orderidbackup', function (req, res) {
  res.sendFile(__dirname + '/view/orderidbackup.html')
})
app.get('/stylehello', function (req, res) {
  res.sendFile(__dirname + '/view/stylehello.css')
})
app.get('/work', function (req, res) {
  res.sendFile(__dirname + '/view/works.css')
})
app.get('/signup', function (req, res) {
  res.sendFile(__dirname + '/view/signup.html')
})
app.get('/akun', function (req, res) {
  res.sendFile(__dirname + '/view/akun.html')
})

app.get('/list', function (req, res) {
  res.sendFile(__dirname + '/view/list.html')
})
app.get('/fromgithub', function (req, res) {
  res.sendFile(__dirname + '/view/fromgithub.html')
})

app.get('/loading', function (req, res) {
  res.sendFile(__dirname + '/view/loading.gif')
})
app.get('/cetak', function (req, res) {
  res.sendFile(__dirname + '/view/cetak.html')
})
app.get('/infokurir', function (req, res) {
  res.sendFile(__dirname + '/view/infokurir.html')
})

app.get('/logout',  function(req, res) {
 
   // req.session.destroy(function(err) {
 
        res.redirect('/index');
   // });
})

app.listen(3000)
console.log('connected')