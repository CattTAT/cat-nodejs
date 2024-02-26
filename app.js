// Create a local server to receive data from

// Load HTTP module
const http = require("http");
const hostname = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Meow Meow study, Meow Meow learn, Meow Meow practice, Meow Meow work hard, Meow Meow grow, Meow Meow success!",
    })
  );
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
