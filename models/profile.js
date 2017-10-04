const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class Profile {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.id_contact = data.id_contact;
  }

  static findAll(cb) {
    db.all(`SELECT * FROM Profile`, (err, rows) => {
      var arrOfObject = []

      for(var i = 0; i < rows.length; i++) {
        arrOfObject.push(new Profile(rows[i]))
      }
      cb(arrOfObject)
    })
  }
}

module.exports = Profile
