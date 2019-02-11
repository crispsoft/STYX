const playerConnections = Array(4).fill(null);
const playerConnMap = new Map();

const game = require('./../gamelogic');


module.exports = (socket) => {

  socket.on('connection', client => {

    // console.log("\nconnection", /* Object.keys(client), */ client.id, playerConnMap.size)

    const nextPlayerIdx = playerConnections.findIndex(conn => conn === null);

    if (nextPlayerIdx < 0) { // No room for another player
      console.log("\tFull game, disconnecting", client.id);
      client.disconnect();
      //? TODO: send message game is full
      return;
    }


    //* Add player connection
    console.log("\nseating", client.id, "at index", nextPlayerIdx);
    playerConnections[nextPlayerIdx] = client;
    playerConnMap.set(client.id, nextPlayerIdx);
    client.emit('seat', nextPlayerIdx);
    socket.emit('players', playerConnections.map(conn => !!conn))

    //* All Players Seated
    if (playerConnections.every(conn => conn !== null)) { 
      console.log("game is ready!")
      socket.emit('ready', true);

      //! TODO: don't always restart the game just due to having a 4th player
      game.setup();
      socket.emit('tile', [0,1,2,3], 3, 3);
    }


    client.on('reconnect', () => {
      console.log("reconn?");
    })


    //* Disconnect
    client.on('disconnect', () => {
      console.log("\ndisconn", client.id);


      if (playerConnMap.has(client.id)) { // Player was seated
        console.log("\tremoving from array & map");
        playerConnMap.delete(client.id);

        const dcPlayerIdx = playerConnections.findIndex(conn => conn === client);
        playerConnections[dcPlayerIdx] = null;

        socket.emit('ready', false); // wait for full game
        socket.emit('players', playerConnections.map(conn => !!conn)); // update players joined
      }

      //? TODO: allow for reconnects
    });


    //* Interactions from Client
    client.on('click', () => {
      if (playerConnMap.has(client.id)) {
        const playerNum = playerConnMap.get(client.id) + 1;
        console.log(playerNum, "clicked!");
        socket.emit('message', playerNum);
        return;
      }
      else {
        console.log("'click' from unknown client!?", client.id);
      }
    })

  });
}
