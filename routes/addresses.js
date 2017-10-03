const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


/*             MENU Addresses             */
router.get('/addresses', (req, res) => {
  var joinqueryaddress = "SELECT Address.id, Address.street, Address.city, Address.zipcode, Contacts.nama FROM Address LEFT JOIN Contacts ON Contacts.id = Address.id_contact"
  var contactquery = 'SELECT * FROM Contacts'

  db.all(joinqueryaddress, (err, rows) => {
    db.all(contactquery, (err, rowscontact) => {
        res.render('addresses', {dataJSONAddresses: rows, dataJsonContact: rowscontact})
    })
  })
})


/*            FORM TAMBAH ADDRESSES            */
router.post('/addresses', (req, res) => {
  db.run(`INSERT INTO Address (street, city, zipcode, id_contact) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.id_contact}')`)
  res.redirect('addresses')
  console.log(req.body);
})

/*           FORM HAPUS ADDRESSES             */
router.get('/addresses/delete/:id', (req, res) => {
  db.all(`DELETE FROM Address WHERE id="${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('/addresses')
  })
})

/*          FORM UPDATE ADDRESSES             */
router.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * FROM Address WHERE id = "${req.param('id')}"`, (err, rows) => {
    var contactquery = 'SELECT * FROM Contacts'
    db.all(contactquery, (err, rowscontact) => {
        res.render('editAddresses', {dataJSONAddresses:rows, dataJsonContact: rowscontact})
        console.log(rows);
        console.log(rowscontact);
    })
  })
})

router.post('/addresses/edit/:id', (req, res) => {
  var query = "UPDATE Address SET street = '" + req.body.street + "', city = '" +
  req.body.city + "', zipcode = '" + req.body.zipcode + "', id_contact = '" + req.body.id_contact +
  "' WHERE id = " + req.param('id')
  db.all(query, (err, rows) => {
    console.log(err);
    res.redirect('../../addresses')
    console.log(rows.body);
  })
})

module.exports = router
