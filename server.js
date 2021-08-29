const MongoClient = require('mongodb').MongoClient;
let http = require('http'),
		express = require('express'),
		app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/login', (req, res) => {
		res.setHeader('Content-type', 'text/html; charset=UTF-8');
		res.end('<h1>Página login</h1>');
});

http.createServer(app).listen(3000); // criando sv na rota 3000 com roteamento no endereço /a

/*
MongoClient.connect('mongodb://localhost:27017/projeto3').then((conn) => {
		let db = conn.db();

		return db.collection('users').find().toArray().finally(() => {
				conn.close();
		});
}).catch((err) => {
		throw err;
}).then((users) => {
		console.log(users);
});


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
*/
