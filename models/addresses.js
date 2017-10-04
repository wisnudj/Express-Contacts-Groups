const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class Addresses {
  constructor(data) {
    this.id = data.id
    this.street = data.street
    this.city = data.city
    this.zipcode = data.zipcode
    this.id_contact = data.id_contact
  }

  static findAll(cb) {
    db.all(`SELECT * FROM Address`, (err, rows) => {
      var arrOfObject = []

      for(var i = 0; i < rows.length; i++) {
        arrOfObject.push(new Addresses(rows[i]))
      }
      cb(arrOfObject)
    })
  }
}

module.exports = Addresses
