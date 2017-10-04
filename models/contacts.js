const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


class Contacts {
    constructor(data) {
      this.id = data.id
      this.nama = data.nama
      this.company = data.company
      this.telp_number = data.telp_number
      this.email = data.email
    }

    static findAll() {
      var object_promise = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Contacts`, (err, rows) => {
          var arrOfObject = []

          for(var i = 0; i < rows.length; i++) {
            arrOfObject.push(new Contacts(rows[i]))
          }
          resolve(arrOfObject)
        })
      })
      return object_promise
    }

    static insertData(arrOfObject) {
      var object_promise = new Promise((resolve, reject) => {
        var contacts = new Contacts(arrOfObject)
        db.run(`INSERT into Contacts (nama, company, telp_number, email) VALUES ('${contacts.nama}','${contacts.company}','${contacts.telp_number}','${contacts.email}')`)
        console.log(arrOfObject);
      })
      /*var contacts = new Contacts(arrOfObject)
      db.run(`INSERT into Contacts (nama, company, telp_number, email) VALUES ('${contacts.nama}','${contacts.company}','${contacts.telp_number}','${contacts.email}')`)
      console.log(arrOfObject); */
      return object_promise
    }

    static deleteData(reqBody) {
      var object_promise = new Promise((resolve, reject) => {
        db.all(`DELETE FROM Contacts WHERE id = "${reqBody}"`)
      })
      //db.all(`DELETE from Contacts WHERE id = "${reqBody}"`)
      return object_promise
    }

    static findOne(reqBody) {
      var object_promise = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Contacts WHERE id = "${reqBody}"`, (err, rows) => {
          resolve(rows)
        })
      })

      return object_promise
      /*db.all(`SELECT * FROM Contacts WHERE id = "${reqBody}"`, (err, rows) => {
        cb(rows)
      }) */
    }

    static updateData(req) {
      var object_promise = new Promise((resolve, reject) => {
        var str = "update Contacts set nama ='" +req.body.nama+ "',";
        str += "company = '" +req.body.company+"',";
        str += "telp_number = '"+req.body.telp_number+"',";
        str += "email = '"+req.body.email+"'";
        str += "WHERE id = "+req.param('id');
        db.all(str);
      })
      return object_promise
    }
}

module.exports = Contacts
