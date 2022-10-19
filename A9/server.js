const express = require('express');
const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var fs = require('fs');

app.use(express.static('public'));

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://keelan:myPassword@dbexample.f5fn5u8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
import "regenerator-runtime/runtime.js";

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

http.listen(port, async () => {
	console.log(`Listening on localhost:${port}`);

	io.on('connection', (socket) => {
		socket.emit('classes', getClasses());
	});
});

async function getClasses() {
	try {
		await client.connect();
		const database = client.db('DBExample');
		const collection = database.collection('classes');
		const options = {
			projection: {_id: 0, name: 1, code: 1}
		};
		
		const cursor = collection.find({}, options);
		const results = await cursor.toArray();
		console.log(results);
		return results;
	} finally {
		await client.close();
	}
}