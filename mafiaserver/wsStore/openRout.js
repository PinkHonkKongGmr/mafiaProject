const sendDataToClient = require("./sendDataToClients.js");

module.exports = function openRout(app, id) {
  const clients = new Set();
  const messages = [];
  let participants = [];
  let updateParticipants;
  app.ws(`/room/${id}`, function (ws) {
    ws.on("message", function (msg) {
      clients.add(ws);
      const parseMsg = JSON.parse(msg);
      const { name, message } = parseMsg;
      if (parseMsg.service) {
        participants.push({ name: parseMsg.name, ws });
        updateParticipants = true;
        messages.push({ name, message: "*зашел в чат*" });
      } else {
        messages.push({ name, message });
        updateParticipants = false;
      }
      sendDataToClient(clients, participants, updateParticipants, messages);
    });

    ws.on("close", function () {
      const name = participants.filter(
        (participant) => participant.ws === ws
      )[0].name;
      participants = participants.filter(
        (participant) => participant.ws !== ws
      );
      messages.push({ name, message: "*покинул чат*" });
      updateParticipants = true;
      sendDataToClient(clients, participants, updateParticipants, messages);
    });
  });
};
