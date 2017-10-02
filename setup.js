const sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


//Membuat TABLE Contacts
db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, company TEXT, telp_number TEXT, email TEXT)", function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("Tabel Contact berhasil dibuat");
  }
})

//Membuat TABLE Groups
db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)", function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Tabel Group berhasil dibuat');
  }
})


//Membuat Table Profile
db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)", function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Tabel Profile Berhasil dibuat');
  }
})



db.run("CREATE TABLE IF NOT EXISTS Address (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT)", function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Tabel Address Berhasil dibuat');
  }
})

//db.run("ALTER TABLE Address ADD id_contact INTEGER REFERENCES Contacts (id)")

/*db.run("CREATE UNIQUE INDEX UNIQUE_NAME ON Profile(id_contact)", (err) => {
  console.log(err);
})*/
