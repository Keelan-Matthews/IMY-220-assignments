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

io.on('connection', (socket) => {
	getClasses().then((classes) => {
		socket.emit('classes', classes);
	});

	socket.on('getEnrolledStudents', (code) => {
		getEnrolledStudents(code);
	});
});

http.listen(port, async () => {
	console.log(`Listening on localhost:${port}`);
});

async function getClasses() {
	console.log("Getting classes");
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

async function getEnrolledStudents(code) {
	console.log(`Getting students enrolled in ${code}`);
	try {
		await client.connect();
		const database = client.db('DBExample');
		const collection = database.collection('users');
		const query = {enrolled: {$all: [code]}};
		
		const cursor = collection.find(query);
		const results = await cursor.toArray();
		console.log(results);
	} finally {
		await client.close();
	}
}