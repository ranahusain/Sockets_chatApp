const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();

//new http server is created is here
const server = http.createServer(app);

//attach socket functionality to the http server above
//is sy sary socket k operations perfom hongy
const io = new Server(server);

io.on("connection", (socket) => {
  //this is used to get event from frontend
  socket.on("UserMessage", (message) => {
    console.log(`message success`);
    //jitny bhi connections hein sabh ko send krdo
    io.emit("message", message);
  });
});

// io.on("connection", (socket) => {
//   console.log("A new user has connected");
// });

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
