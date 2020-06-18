const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
app.use(cors());

function openRout(id) {
	const messages = [];
	app.ws(`/room/${id}`, function (ws) {
		ws.on('message', function (msg) {
			messages.push(msg);
			const toSend = { id, messages };
			const clients = expressWs.getWss().clients;
			for (let client of clients) {
				client.send(JSON.stringify(toSend));
			}
		});
	});
}

app.ws('/', function (ws) {
	ws.on('message', function (id) {
		openRout(id);
	});
});

app.listen(5000, () => console.log('thats ok!'));
