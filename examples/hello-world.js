'use strict';

const { createServer } = require('http');
const Rxpress = require('../dist/rxpress').default;
const logger = require('morgan')('dev');

const server = createServer();

const app = Rxpress(server);

app.useExpressMiddleware(logger);

app.get('/hello-world', (req, res) => res.end('Hello World'));
app.get('/hello', (req, res) => res.end('Hello'));

app
    .getRequest$()
    .filter(({ req, res }) => req.url === '/banana')
    .subscribe(({ res }) => res.end('🍌'));

server.listen(3000);
