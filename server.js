const http = require('http');

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/projeto3', (err,conn) => {

		if(err) throw err;

		const db = conn.db();

		const collection = db.collection('tests');

		collection.find().toArray(( err,res) => {
				if(err) throw err;
				console.log(res)
				conn.close();
		});

});

let server = http.createServer((res) => {
		res.setHeader('Content-type', 'text/html; charset=UTF-8');
		res.end();
});

server.listen(8000);

