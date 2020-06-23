const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
const sendDataToClient = require('./helpers.js');
app.use(cors());

const games = [];
function openRout(id) {
	const clients = new Set();
	const messages = [];
	let participants = [];
	let updateParticipants;
	app.ws(`/room/${id}`, function (ws) {
		ws.on('message', function (msg) {
			clients.add(ws);
			const parseMsg = JSON.parse(msg);
			const { name, message } = parseMsg;
			if (parseMsg.service) {
				participants.push({ name: parseMsg.name, ws });
				updateParticipants = true;
				messages.push({ name, message: '*зашел в чат*' });
			} else {
				messages.push({ name, message });
				updateParticipants = false;
			}
			sendDataToClient(clients, participants, updateParticipants, messages);
		});

		ws.on('close', function () {
			const name = participants.filter((participant) => participant.ws === ws)[0].name;
			participants = participants.filter((participant) => participant.ws !== ws);
			messages.push({ name, message: '*покинул чат*' });
			updateParticipants = true;
			sendDataToClient(clients, participants, updateParticipants, messages);
		});
	});
}

app.ws('/init', function (ws) {
	ws.on('message', function (data) {
		const { id, name } = JSON.parse(data);
		if (name.length > 2) {
			// for (let game of games) {
			// 	if (game.name === name) return;
			// }
			games.push({ id, name });
		}
		openRout(id);
	});
});

app.ws('/game', function (ws) {
	ws.on('message', function () {
		ws.send(JSON.stringify(games));
	});
});

app.listen(5000, () => console.log('thats ok!'));
