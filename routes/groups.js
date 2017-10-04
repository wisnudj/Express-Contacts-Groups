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

  Groups.findAll().then((value) => {
    res.render('groups', {dataJSONGroups: value})
  })

})

/*      FORM TAMBAH GROUPS        */
router.post('/groups', (req, res) => {

  Groups.insertData(req.body)
  res.redirect('groups')

})


/*         HAPUS GROUPS           */
router.get('/delete/:id', (req, res) => {
  Groups.deleteData(req.params.id)
  res.redirect('/groups')
})


/*         UPDATE GROUPS          */
router.get('/edit/:id', (req, res) => {
  /*db.all(`select * from Groups where id = "${req.param('id')}"`,(err, rows)=>{
    res.render('editGroups',{dataJSONGroups:rows});
  }); */
  /*Groups.findOne(req.params.id, function (rows) {
    res.render('editGroups', {dataJSONGroups: rows})
  }) */
  Groups.findOne(req.params.id).then((value) => {
    res.render('editGroups', {dataJSONGroups: value})
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
