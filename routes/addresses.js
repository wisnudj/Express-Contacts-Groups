const express = require('express')
const router = express.Router()
const Addresses = require('../models/addresses')
const Contact = require('../models/contacts')
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


/*             MENU Addresses             */
router.get('/addresses', (req, res) => {

  Addresses.findAll().then((valueAddress) => {
    Contact.findAll().then((valueContact) => {
      for(var i = 0; i < valueAddress.length; i++) {
        for(var j = 0; j < valueContact.length; j++) {
          if(valueAddress[i].id_contact == valueContact[j].id) {
            valueAddress[i].nama = valueContact[j].nama
          }
        }
      }
      res.render('addresses', {dataJSONAddresses: valueAddress, dataJsonContact: valueContact})
    })
  })
})


/*            FORM TAMBAH ADDRESSES            */
router.post('/addresses', (req, res) => {
  /*db.run(`INSERT INTO Address (street, city, zipcode, id_contact) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.id_contact}')`) */
  Addresses.insertData(req.body)
  res.redirect('/addresses')

  //console.log(req.body);
})

/*           FORM HAPUS ADDRESSES             */
router.get('/addresses/delete/:id', (req, res) => {
  /*db.all(`DELETE FROM Address WHERE id="${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('/addresses')
  }) */
  Addresses.deleteData(req.params.id)
  res.redirect('/profiles')
})

/*          FORM UPDATE ADDRESSES             */
router.get('/addresses/edit/:id', (req, res) => {
  /*db.all(`SELECT * FROM Address WHERE id = "${req.param('id')}"`, (err, rows) => {
    var contactquery = 'SELECT * FROM Contacts'
    db.all(contactquery, (err, rowscontact) => {
        res.render('editAddresses', {dataJSONAddresses:rows, dataJsonContact: rowscontact})
        console.log(rows);
        console.log(rowscontact);
    })
  }) */
  Addresses.findOne(req.params.id).then((values) => {
    res.render('editAddresses', {dataJSONAddresses: values})
  })
})

router.post('/addresses/edit/:id', (req, res) => {
  var query = "UPDATE Address SET street = '" + req.body.street + "', city = '" +
  req.body.city + "', zipcode = '" + req.body.zipcode + "', id_contact = '" + req.body.id_contact +
  "' WHERE id = " + req.param('id')
  /*db.all(query, (err, rows) => {
    console.log(err);
    res.redirect('../../addresses')
    console.log(rows.body);
  }) */
  Addresses.updateData(req)
  res.redirect('../../addresses')
})

module.exports = router
