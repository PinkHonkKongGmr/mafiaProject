const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
app.use(cors());

function openRout(id) {
	const clients = new Set();
	const messages = [];
	app.ws(`/room/${id}`, function (ws) {
		ws.on('message', function (msg) {
			clients.add(ws);
			if (msg === id + 'no need to print it') {
			} else {
				messages.push(msg);
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
	ws.on('message', function (id) {
		openRout(id);
	});
});

app.listen(5000, () => console.log('thats ok!'));
