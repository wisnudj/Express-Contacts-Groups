db.run("CREATE UNIQUE INDEX UNIQUE_NAME ON Profile(id_contact)", (err) => {
  console.log(err);
})


static findAll(cb) {
  var profilequery = 'SELECT * FROM Profile';
  db.all(profilequery, (err, rows) => {
    let arr = [];
    rows.forEach((row) => {
      let obj = new Profile(row.id, row.id_contact, row.username, row.password);
      arr.push(obj);
    })
    cb(arr);
  })
}
