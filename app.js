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
const dbPath = "C:\\Users\\chinc\\cat.db";
let connection = null;
const connectDB = () => {
  connection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the cat.db SQlite database.");
  });
};
const disconnectDB = () => {
  connection.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

const query = () => {
  // query data
  return new Promise((resolve, reject) => {
    connection.serialize(function () {
      connection.all("SELECT * FROM cats", function (err, rows) {
        if (err) {
          return reject(new Error(err.message));
        }
        resolve(rows);
      });
    });
  });
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
    case "/meow":
      connectDB();
      res.writeHead(200, { "Content-Type": "application/json" });
      query()
        .then((result) => {
          res.end(JSON.stringify({ data: result }));
        })
        .catch((err) => {
          res.end(JSON.stringify({ error: err.message }));
        });
      disconnectDB();
      break;
  }
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
