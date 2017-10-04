const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class Groups {
  constructor(data) {
    this.id = data.id
    this.name_of_group = data.name_of_group
  }

  static findAll() {

    var object_promise = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups`, (err, rows) => {
        var arrOfObject = []

        for(var i = 0; i < rows.length; i++) {
          arrOfObject.push(new Groups(rows[i]))
        }
        resolve(arrOfObject)
      })
    })

    return object_promise
  }

  static insertData(reqBody) {
    db.run(`INSERT INTO Groups (name_of_group) VALUES ('${reqBody.name_of_group}')`)
  }

  static deleteData(reqBody, cb) {
    db.all(`DELETE from Groups WHERE id = "${reqBody}"`)
  }

  static findOne(reqBody) {
    /*db.all(`SELECT * FROM Groups WHERE id = '${reqBody}'`, (err, rows) => {
      cb(rows)
    }) */
    var object_promise = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups WHERE id = "${reqBody}"`, (err, rows) => {
        resolve(rows)
      })
    })
    return object_promise
  }

  static updateData(req) {
    var query = "UPDATE Groups set name_of_group ='" +req.body.name_of_group+ "'" + "WHERE id = "+req.param('id')
    db.all(query)
  }
}


module.exports = Groups
