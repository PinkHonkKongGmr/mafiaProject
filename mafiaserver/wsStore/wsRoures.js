const openRout = require("./openRout.js");
const GamesStore = require("./gameStores");

module.exports = function wsRoutes(app) {
  const gameStore = new GamesStore();

  app.ws("/init", function (ws) {
    ws.on("message", function (data) {
      const { id, name } = JSON.parse(data);
      if (name.length > 2) {
        // for (let game of games) {
        // 	if (game.name === name) return;
        // }
        gameStore.games.push({ id, name });
        gameStore.sendMessages();
      }
      openRout(app, id);
    });
  });

  app.ws("/game", function (ws) {
    gameStore.subscribers.push(ws);
    ws.on("message", function () {
      gameStore.sendMessages();
    });
  });
};
