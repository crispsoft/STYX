const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();


// Sockets Config
const server = require('http').Server(app); 
const io = require('socket.io')(server);

require('./config/gameSocket')(io.of('/'));


app.use(
  express.urlencoded({ extended: true }),
  express.json()
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/test", (req, res) => {
  res.json({'a': 'A-OK'});
})

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


//! not app.listen (need server. with >>sockets<<)
server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
