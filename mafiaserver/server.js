const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
app.use(cors());

const games = [];

function openRout(id) {
	const clients = new Set();
	const messages = [];
	app.ws(`/room/${id}`, function (ws) {
		ws.on('message', function (msg) {
			clients.add(ws);
			const parseMsg = JSON.parse(msg);
			if (parseMsg.init) {
			} else {
				const { name, message } = parseMsg;
				messages.push({ name, message });
			}
			const toSend = { id, messages };
			clients.forEach((client) => {
				if (client.readyState !== 1) clients.delete(client);
				else client.send(JSON.stringify(toSend));
			});
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
