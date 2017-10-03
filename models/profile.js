class Profile {
  constructor(id, id_contact, username, password) {
    this.id = id;
    this.id_contact = id_contact;
    this.username = username;
    this.password = password;
  }

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
}
