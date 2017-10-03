const express = require('express')
const router = express.Router()
var Contact = require('../models/contacts')
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});



/*        MENU Contacts      */
router.get('/contacts', (req, res) => {
  /*db.all('SELECT * FROM Contacts',(err, rows)=>{
    res.render('contacts',{dataJsonContact:rows});
  }); */
  Contact.findAll(function (rowscontact) {
    res.render('contacts',{dataJsonContact:rowscontact});
  })
})


/*       FORM TAMBAH CONTACT        */
router.post('/contacts', (req, res) => {
  /*db.run(`INSERT into Contacts (nama, company, telp_number, email) VALUES ('${req.body.nama}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`) */
  Contact.insertData(req.body)
    res.redirect('contacts');
})


/*        HAPUS CONTACT           */
router.get('/delete/:id', (req, res) => {
  /*db.all(`DELETE from Contacts WHERE id = "${req.params.id}"`,(err, rows)=>{
    console.log(err);

  }); */
  Contact.deleteData(req.params.id, function () {
    console.log(req.params);
    res.redirect('/contacts');
  })
})

/*        UPDATE CONTACT         */
router.get('/edit/:id', (req, res) => {
  /*db.all(`select * from Contacts where id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editContacts',{dataJsonContact:rows});
  }); */
  Contact.findOne(req.params.id, function (rowscontact) {
    res.render('editContacts', {dataJsonContact: rowscontact})
  })
})

router.post('/edit/:id', (req, res) => {
  /*var str = "update Contacts set nama ='" +req.body.nama+ "',";
  str += "company = '" +req.body.company+"',";
  str += "telp_number = '"+req.body.telp_number+"',";
  str += "email = '"+req.body.email+"'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows)=>{
    console.log(err);
    res.redirect('../../contacts');
    console.log(rows.body);
  }); */

  Contact.updateData(req)
    res.redirect('../../contacts');
})

router.get('/contacts/addresses/:id', (req, res) => {
  db.all(`SELECT * FROM Address where id_contact ="${req.param('id')}"`, (err, rows) => {
    db.all(`SELECT * FROM Contacts where id = "${req.param('id')}"`, (er, rowscontact) => {
      res.render('contactAddress', {dataJSONAddresses: rows, dataJsonContact: rowscontact})
    })
  })
})

router.post('/contacts/addresses/:id', (req, res) => {
  db.all(`SELECT * FROM Contacts`, (err, rowscontact) => {
    db.run(`INSERT INTO Address (street, city, zipcode, id_contact) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', "${req.param('id')}")`)
    res.render('contacts', {dataJsonContact: rowscontact})
  })
})

module.exports = router
