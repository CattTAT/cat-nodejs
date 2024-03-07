const sqlite3 = require("sqlite3").verbose();
const dbPath = "C:\\Users\\chinc\\cat.db";

// open database in memory
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to SQlite database.");
});

// insert data
db.serialize(function () {
  db.run("CREATE TABLE cat(name text)", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("create table cat");
  });

  db.run("INSERT INTO cat(name) VALUES(?)", ["Mike"], function (err) {
    if (err) {
      return console.log("insert data error: ", err.message);
    }
    console.log("insert data: ", this);
  });

  db.all("SELECT * FROM cats", function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    console.log(rows);
  });

});


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
