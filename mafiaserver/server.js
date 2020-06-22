const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
app.use(cors());

const games = [];
expressWs.getWss().clients;
function openRout(id) {
	const clients = new Set();
	const messages = [];
	let participants = [];
	app.ws(`/room/${id}`, function (ws) {
		ws.on('message', function (msg) {
			clients.add(ws);
			const parseMsg = JSON.parse(msg);
			const { name, message } = parseMsg;
			let sendNewNameParticipant;
			if (parseMsg.service) {
				if (parseMsg.out) {
					participants = participants.filter((participant) => participant !== parseMsg.name);
					messages.push({ name, message: '*покинул чат*' });
				} else {
					participants.push({ name: parseMsg.name, ws });
					sendNewNameParticipant = true;
					messages.push({ name, message: '*зашел в чат*' });
				}
			} else {
				messages.push({ name, message });
				sendNewNameParticipant = false;
			}
			const toSend = {
				id,
				messages,
				sendNewNameParticipant,
				participants: participants.map((participant) => participant.name),
			};
			clients.forEach((client) => {
				if (client.readyState !== 1) clients.delete(client);
				else client.send(JSON.stringify(toSend));
			});
		});
		ws.on('open', function () {
			console.log('open nax');
		});
		ws.on('close', function () {
			participants = participants.filter((participant) => participant.ws !== ws);
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
