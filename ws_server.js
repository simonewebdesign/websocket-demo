#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log('Received request from ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(1337, function() {
    console.log('Server is listening on port 1337.');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false // because security matters
});

function isAllowedOrigin(origin) {
  valid_origins = ['http://localhost', '127.0.0.1'];
  if (valid_origins.indexOf(origin) != -1) {
    console.log('Connection accepted from origin ' + origin);
    return true;
  }
  return false;
}

wsServer.on('connection', function(webSocketConnection) {
  console.log('Connection started.');
});

wsServer.on('request', function(request) {

  var connection = isAllowedOrigin(request.origin) ?
    request.accept()
    : request.reject();

  connection.on('message', function(message) {

    var response = '';
    console.log('Received Message: ' + message.utf8Data);

    if (message.type === 'utf8') {

      switch (message.utf8Data) {
        case 'hi':
          response = 'Hey there';
          break;
        case 'hello':
          response = 'Heya!';
          break;  
        case 'xyzzy':
          response = 'Nothing happens.';
          break;
        case 'desu':
          response = 'Keep typing, man. Keep typing.';
          break;
        default:
          response = "Hello. Uh... what am I supposed to do with '" + 
          message.utf8Data + "'?";
      }
      connection.sendUTF(response);
    }
  });
  connection.on('close', function(reasonCode, description) {
      console.log(connection.remoteAddress + ' has been disconnected.');
  });
});