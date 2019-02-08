const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const server = require('http').createServer(app); 
const io = require('socket.io')(server);


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


const playerConnections = Array(4).fill(null);

io.on('connection', client => {
  console.log("conn!?", Object.keys(client), client.id);
  client.on('event', data => { 
    console.log("event!?", data)
  });
  client.on('disconnect', () => { 
    console.log("disconn?!");
  });
});


server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
