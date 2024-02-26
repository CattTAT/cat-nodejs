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
  }
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
