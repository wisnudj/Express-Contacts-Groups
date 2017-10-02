db.run("CREATE UNIQUE INDEX UNIQUE_NAME ON Profile(id_contact)", (err) => {
  console.log(err);
})
