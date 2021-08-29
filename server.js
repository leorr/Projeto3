const http = require('http');
let server = http.createServer((req, res) => {
		console.log(req.headers);
		console.log(res.getHeaders());
		res.write('Hello World');
		res.end();
});
server.listen(8000);

