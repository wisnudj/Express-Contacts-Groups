/*         require          */
var express = require('express')
var bodyParser = require('body-parser');
var app = express()
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


/*        MENU INDEX         */
app.get('/', function(req, res) {
  res.render('index')
})


/*        MENU Contacts      */
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM Contacts',(err, rows)=>{
    res.render('contacts',{dataJsonContact:rows});
    console.log(rows.body);
  });
})

app.get('/contacts/addresses/:id', (req, res) => {
  db.all(`SELECT * FROM Address where id_contact ="${req.param('id')}"`, (err, rows) => {
    db.all(`SELECT * FROM Contacts where id = "${req.param('id')}"`, (er, rowscontact) => {
      res.render('contactAddress', {dataJSONAddresses: rows, dataJsonContact: rowscontact})
    })
  })
})

app.post('/contacts/addresses/:id', (req, res) => {
  db.all(`SELECT * FROM Contacts where id = "${req.param('id')}"`, (er, rowscontact) => {
    db.run(`INSERT INTO Address (street, city, zipcode, id_contact) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', "${req.param('id')}")`)
    res.render('contacts', {dataJsonContact: rowscontact})
  })
})


/*       FORM TAMBAH CONTACT        */
app.post('/contacts', (req, res) => {
  db.run(`INSERT into Contacts (nama, company, telp_number, email) VALUES ('${req.body.nama}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`)
  res.redirect('contacts');
  console.log(req.body);
});


/*        HAPUS CONTACT           */
app.get('/contacts/delete/:id', (req, res) => {
  db.all(`DELETE from Contacts WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('/contacts');
  });
})


/*        UPDATE CONTACT         */
app.get('/contacts/edit/:id', (req, res) => {
  db.all(`select * from Contacts where id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editContacts',{dataJsonContact:rows});
  });
});

app.post('/contacts/edit/:id', (req, res) => {
  var str = "update Contacts set nama ='" +req.body.nama+ "',";
  str += "company = '" +req.body.company+"',";
  str += "telp_number = '"+req.body.telp_number+"',";
  str += "email = '"+req.body.email+"'";
  str += "WHERE id = "+req.param('id');
  db.all(str,(err, rows)=>{
    console.log(err);
    res.redirect('../../contacts');
    console.log(rows.body);
  });
});


/*        MENU GROUPS           */
app.get('/groups', (req, res) => {
  db.all('SELECT * FROM Groups', (err, rows) => {
    res.render('groups', {dataJSONGroups: rows})
    console.log(rows.body);
  })
})

/*      FORM TAMBAH GROUPS        */
app.post('/groups', (req, res) => {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.name_of_group}')`)
  res.redirect('groups')
})


/*         HAPUS GROUPS           */
app.get('/groups/delete/:id', (req, res) => {
  db.all(`DELETE from Groups WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err);
    res.redirect('/groups');
  });
})


/*         UPDATE GROUPS          */
app.get('/groups/edit/:id', (req, res) => {
  db.all(`select * from Groups where id = "${req.param('id')}"`,(err, rows)=>{
    console.log(rows);
    res.render('editGroups',{dataJSONGroups:rows});
  });
});

app.post('/groups/edit/:id', (req, res) => {
  var query = "UPDATE Groups set name_of_group ='" +req.body.name_of_group+ "'" + "WHERE id = "+req.param('id')

  db.all(query,(err, rows)=>{
    console.log(err);
    res.redirect('../../groups');
    console.log(rows.body);
  });
});


/*        MENU PROFILE            */
app.get('/profiles', (req, res) => {
  var joinquery = "SELECT Profile.id, Profile.username, Profile.password, Contacts.nama FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.id_contact"
  var contactquery = 'SELECT * FROM Contacts'
  // var query = 'SELECT * FROM Profile'
  db.all(joinquery, (err, rows) => {
    //res.send(rows)
    // console.log(rows);
    db.all(contactquery, (err, rowscontact) => {
      //res.send(rows)
      console.log(rows);
      res.render('profile', {data: " " , dataJSONProfile: rows, dataJsonContact: rowscontact})
    })
  })
})

/*       FORM TAMBAH PROFILE       */
app.post('/profiles', (req, res) => {
  db.run(`INSERT INTO Profile (username, password, id_contact) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.id_contact}')`, (err) => {
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
  console.log(req.body);
})


/*       FORM HAPUS PROFILE       */
app.get('/profiles/delete/:id', (req, res) => {
  db.all(`DELETE FROM Profile WHERE id="${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('/profiles')
  })
})


/*             UPDATE PROFILE              */
app.get('/profiles/edit/:id', (req, res) => {
  var joinquery = "SELECT Profile.id, Profile.username, Profile.password, Contacts.nama FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.id_contact"

  var contactquery = 'SELECT * FROM Contacts'

  db.all(`SELECT * FROM Profile WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(rows);
    res.render('editProfile', {dataJSONProfile:rows})
  })
})


app.post('/profiles/edit/:id', (req, res) => {
  var query = "UPDATE Profile SET username = '" + req.body.username + "', password = '" + req.body.password + "' WHERE id = " + req.param('id')
  db.all(query, (err, rows) => {
    console.log(err);
    res.redirect('../../profiles')
    console.log(rows.body);
  })
})

/*             MENU Addresses             */
app.get('/addresses', (req, res) => {
  var joinqueryaddress = "SELECT Address.id, Address.street, Address.city, Address.zipcode, Contacts.nama FROM Address LEFT JOIN Contacts ON Contacts.id = Address.id_contact"
  var contactquery = 'SELECT * FROM Contacts'

  db.all(joinqueryaddress, (err, rows) => {
    db.all(contactquery, (err, rowscontact) => {
        res.render('addresses', {dataJSONAddresses: rows, dataJsonContact: rowscontact})
    })
  })
})


/*            FORM TAMBAH ADDRESSES            */
app.post('/addresses', (req, res) => {
  db.run(`INSERT INTO Address (street, city, zipcode, id_contact) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.id_contact}')`)
  res.redirect('addresses')
  console.log(req.body);
})


/*           FORM HAPUS ADDRESSES             */
app.get('/addresses/delete/:id', (req, res) => {
  db.all(`DELETE FROM Address WHERE id="${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('/addresses')
  })
})


/*          FORM UPDATE ADDRESSES             */
app.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * FROM Address WHERE id = "${req.param('id')}"`, (err, rows) => {
    var contactquery = 'SELECT * FROM Contacts'
    db.all(contactquery, (err, rowscontact) => {
        res.render('editAddresses', {dataJSONAddresses:rows, dataJsonContact: rowscontact})
        console.log(rows);
        console.log(rowscontact);
    })
  })
})

app.post('/addresses/edit/:id', (req, res) => {
  var query = "UPDATE Address SET street = '" + req.body.street + "', city = '" +
  req.body.city + "', zipcode = '" + req.body.zipcode + "', id_contact = '" + req.body.id_contact +
  "' WHERE id = " + req.param('id')
  db.all(query, (err, rows) => {
    console.log(err);
    res.redirect('../../addresses')
    console.log(rows.body);
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
