const express = require('express');
const config = require('./configure');
const http = require('http');
let app = express();
const port = process.env.PORT || 8080;
app.set('port', port);
app = config(app);

const onListening = () => {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

module.exports = server;