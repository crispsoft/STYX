const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/styxgame";

mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

//* CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + MONGODB_URI);
}); 

// If the connection throws an error
mongoose.connection.on('error', function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

module.exports = mongoose;