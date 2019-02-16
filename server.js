require('dotenv').config();


//* Database
require('./config/mongoose').connection.dropDatabase(); //TODO! CHANGE, this is hard reset on server start


//* Express 
const express = require("express");
const app = express();
const server = require('http').Server(app); 

//* Express Middleware
app.use(
  require('morgan')('dev'), // Logging

  express.urlencoded({ extended: true }), // parses urlencoded payloads
  express.json(),                         // parses JSON payloads

  require('helmet')(), // collection of security settings
  require("cookie-session")( 
    {
      name: 'styxsess',
      secret: process.env.SESSION_SECRET,
      maxAge: 1000*60*60*24, // 1day = 1000ms, 60sec, 60min, 24hr
      secure: true,
      httpOnly: true,
    }),
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


//* Sockets Config
const io = require('socket.io')(server);
require('./config/gameSocket')(io.of('/'));


//* Routes
app.use("/api", require('./routes/api'));

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(require("path").join(__dirname, "./client/build/index.html"));
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => { // care: NOT >>app<<.listen, need >>server<< with sockets
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
