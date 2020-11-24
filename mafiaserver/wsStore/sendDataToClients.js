module.exports = function sendDataToClient(clients, participants, updateParticipants, messages) {
	const toSend = {
		messages,
		updateParticipants,
		participants: participants.map((participant) => participant.name),
	};
	clients.forEach((client) => {
		if (client.readyState !== 1) clients.delete(client);
		else client.send(JSON.stringify(toSend));
	});
};
