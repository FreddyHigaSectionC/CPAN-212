// Importing the http module
const http = require("http");

// Creating an http server 
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World"); // Sends the text
    res.end(); // Ends the response and sends it to the client
  }
  else if (req.url === "about") {
    res.write("about us");
    res.end();
  }
  else if (req.url === "/login") {
    res.write("login"); // Responds with "login" for request to /login
    res.end();
  }
  else if (req.url === "/register") {
    res.write("register");
    res.end();
  }
  else if (req.url === "/logout") {
    res.write("logout");
    res.end();
  }
  else {
    res.write("page not found");
    res.end();
  }
});

server.listen(3000);

console.log("Listening to on port 3000");