/*         require          */
var express = require('express')
var bodyParser = require('body-parser');
var app = express()
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var index = require('./routes/index')
var contacts = require('./routes/contacts')
var groups = require('./routes/groups')
var profiles = require('./routes/profiles')
var addresses = require('./routes/addresses')

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


app.use('/', index)
app.use('/', contacts)
app.use('/contacts', contacts)
app.use('/', groups)
app.use('/groups', groups)
app.use('/', profiles)
app.use('/profiles', profiles)
app.use('/', addresses)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
