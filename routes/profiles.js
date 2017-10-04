const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Contact = require('../models/contacts')

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

/*        MENU PROFILE            */
router.get('/profiles', (req, res) => {
  var joinquery = "SELECT Profile.id, Profile.username, Profile.password, Profile.id_contact, Contacts.nama FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.id_contact"
  var contactquery = 'SELECT * FROM Contacts'
  var profilesquery = `SELECT * FROM Profile`

  /*db.all(profilesquery, (err, rows) => {
    db.all(contactquery, (err, rowscontact) => {
      console.log(rows);
      console.log(rowscontact);
      console.log(rows[]);
      res.render('profile', {data: " " , dataJSONProfile: rows, dataJsonContact: rowscontact})
    })
  }) */

  /*Profile.findAll(function (arrOfObjectProfile) {
    Contact.findAll(function(arrOfObjectContact) {

      for(var i = 0; i < arrOfObjectProfile.length; i++) {
      for(var j = 0; j < arrOfObjectContact.length; j++) {
        if(arrOfObjectProfile[i].id_contact == arrOfObjectContact[j].id) {
          arrOfObjectProfile[i].nama = arrOfObjectContact[j].nama
        }
      }
    }

    res.render('profile', {data: " " , dataJSONProfile: arrOfObjectProfile, dataJsonContact: arrOfObjectContact})

    })
  }) */

  Profile.findAll().then((valueProfile) => {
    Contact.findAll().then((valueContact) => {
      for(var i = 0; i < valueProfile.length; i++) {
        for(var j = 0; j < valueContact.length; j++) {
          if(valueProfile[i].id_contact == valueContact[j].id) {
            valueProfile[i].nama = valueContact[j].nama
          }
        }
      }
      res.render('profile', {data: " ", dataJSONProfile: valueProfile, dataJsonContact: valueContact} )
    })
  })

})


/*       FORM TAMBAH PROFILE       */
router.post('/profiles', (req, res) => {
  /*db.run(`INSERT INTO Profile (username, password, id_contact) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.id_contact}')`, (err) => {
    if(err) {
      var joinquery = "SELECT * FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.id_contact"
      var contactquery = 'SELECT * FROM Contacts'
      // var query = 'SELECT * FROM Profile'
      db.all(joinquery, (err, rows) => {
        // res.send(rows)
        // console.log(rows);
        db.all(contactquery, (err, rowscontact) => {
          res.render('profile', {data: "ini salah " , dataJSONProfile: rows, dataJsonContact: rowscontact})
        })
      })
    }
    else {
      res.redirect('/profiles')
    }
  })
  //res.redirect('profile')
  console.log(req.body); */
  Profile.insertData(req.body)
  res.redirect('/profiles')
})


/*       FORM HAPUS PROFILE       */
router.get('/profiles/delete/:id', (req, res) => {
  Profile.deleteData(req.params.id)
  res.redirect('/profiles')
})

/*             UPDATE PROFILE              */
router.get('/edit/:id', (req, res) => {
  var joinquery = "SELECT Profile.id, Profile.username, Profile.password, Contacts.nama FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.id_contact"

  var contactquery = 'SELECT * FROM Contacts'

  /*db.all(`SELECT * FROM Profile WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(rows);
    res.render('editProfile', {dataJSONProfile:rows})
  }) */
  Profile.findOne(req.params.id).then((value) => {
    res.render('editProfile', {dataJSONProfile: value})
  })
})


router.post('/edit/:id', (req, res) => {
  var query = "UPDATE Profile SET username = '" + req.body.username + "', password = '" + req.body.password + "' WHERE id = " + req.param('id')
  /*db.all(query, (err, rows) => {
    console.log(err);
    res.redirect('../../profiles')
    console.log(rows.body);

  }) */
    Profile.updateData(req)
    res.redirect('../../profiles')
})



module.exports = router
