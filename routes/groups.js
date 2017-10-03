const express = require('express')
const router = express.Router()
var Groups = require('../models/groups')
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

/*        MENU GROUPS           */
router.get('/groups', (req, res) => {
  /*db.all('SELECT * FROM Groups', (err, rows) => {
    res.render('groups', {dataJSONGroups: rows})
    console.log(rows.body);
  }) */
  Groups.findAll(function(arrOfObject) {
    console.log(arrOfObject);
    res.render('groups', {dataJSONGroups: arrOfObject})
  })
})

/*      FORM TAMBAH GROUPS        */
router.post('/groups', (req, res) => {
  /*db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.name_of_group}')`) */
  Groups.insertData(req.body, function() {
    res.redirect('groups')
  })
  //res.redirect('groups')
})


/*         HAPUS GROUPS           */
router.get('/delete/:id', (req, res) => {
  /*db.all(`DELETE from Groups WHERE id = "${req.param('id')}"`,(err, rows)=>{
    console.log(err)
    res.redirect('/groups');
  }); */
  Groups.deleteData(req.params.id, function() {
    res.redirect('/groups')
  })
})


/*         UPDATE GROUPS          */
router.get('/edit/:id', (req, res) => {
  /*db.all(`select * from Groups where id = "${req.param('id')}"`,(err, rows)=>{
    res.render('editGroups',{dataJSONGroups:rows});
  }); */
  Groups.findOne(req.params.id, function (rows) {
    res.render('editGroups', {dataJSONGroups: rows})
  })
})

router.post('/edit/:id', (req, res) => {
  /*var query = "UPDATE Groups set name_of_group ='" +req.body.name_of_group+ "'" + "WHERE id = "+req.param('id')

  db.all(query,(err, rows)=>{
    console.log(err);
    res.redirect('../../groups');
    console.log(rows.body);
  }); */
  Groups.updateData(req)
    res.redirect('../../groups')
})

module.exports = router
