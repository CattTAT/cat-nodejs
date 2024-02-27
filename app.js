// Create a local server to receive data from

// Load HTTP module
const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 8000;

const imgList = [
  "Boss_MEOW.jpeg",
  "Debug_MEOW.jpeg",
  "Double_Meow.jpeg",
  "Sleepy_MEOW.jpeg",
];

const sqlite3 = require("sqlite3").verbose();

const query = () => {
  const result = {};
  // open database in memory
  let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  });

  // query data
  db.serialize(function () {
    db.each("SELECT name FROM cat", function (err, row) {
      if (err) {
        return console.error(err.message);
      }
      console.log(row.name);
      //   result.push({ name: row.name });
    });
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
  return result;
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: "Meow Meow study, Meow Meow learn, Meow Meow practice, Meow Meow work hard, Meow Meow grow, Meow Meow success! test",
        })
      );
      break;
    case "/img":
      fs.readFile(
        "./image/" + imgList[Math.floor(Math.random() * 4)],
        function (err, data) {
          if (err) throw err;
          // res.write(data);
          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.end(data, "base64");
        }
      );
      break;
    case "/db":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: query(),
        })
      );
      break;
  }
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
