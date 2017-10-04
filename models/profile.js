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

  static findAll() {
    var object_promise = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Profile`, (err, rows) => {
        var arrOfObject = []

        for(var i = 0; i < rows.length; i++) {
          arrOfObject.push(new Profile(rows[i]))
        }
        resolve(arrOfObject)
      })
    })
    return object_promise
  }

  static insertData(arrOfObject) {
    var object_promise = new Promise((resolve, reject) => {
      var profile = new Profile(arrOfObject)
      db.run(`INSERT INTO Profile (username, password, id_contact) VALUES ('${profile.username}', '${profile.password}', '${profile.id_contact}')`, (err) => {
        if(err) {
          resolve('')
        }
      })
    })
    return object_promise
  }

  static deleteData(reqBody) {
    db.all(`DELETE FROM Profile WHERE id = "${reqBody}"`)
  }

  static findOne(reqBody) {
    var object_promise = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Profile WHERE id = "${reqBody}"`, (err, rows) => {
        resolve(rows)
      })
    })

    return object_promise
  }

  static updateData(req) {
    var object_promise = new Promise((resolve, reject) => {
      var query = "UPDATE Profile SET username = '" +
      req.body.username + "', password = '" +
      req.body.password + "' WHERE id = " +
      req.param('id')

      db.all(query)
    })
    return object_promise
  }


}

module.exports = Profile
