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
    var object_promise = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM address`, (err, rows) => {
        var arrOfObject = []

        for(var i = 0; i < rows.length; i++) {
          arrOfObject.push(new Addresses(rows[i]))
        }
        resolve(arrOfObject)
      })
    })
    return object_promise
  }

  static insertData(arrOfObject) {
    var object_promise = new Promise((resolve, reject) => {
      var addresses = new Addresses(arrOfObject)
      db.run(`INSERT INTO Address (street, city, zipcode, id_contact) VALUES ('${addresses.street}', '${addresses.city}', '${addresses.zipcode}', '${addresses.id_contact}')`)
    })

    return object_promise
  }

  static deleteData(reqBody) {
    var object_promise = new Promise((resolve, reject) => {
      db.all(`DELETE FROM Address WHERE id = "${reqBody}"`)
    })
    return object_promise
  }

  static findOne(reqBody) {
    var object_promise = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Address WHERE id = "${reqBody}"`, (err, rows) => {
        resolve(rows)
      })
    })
    return object_promise
  }

  static updateData(req) {
    var object_promise = new Promise((resolve, reject) => {
      db.all(`UPDATE Address SET street = "${req.body.street}", "${req.body.city}", "${req.body.zipcode}", "${req.body.id_contact}" WHERE id = "{req.params.id}"`)
    })
    return object_promise
  }

}

module.exports = Addresses
