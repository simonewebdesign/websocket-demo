(function () {

  var ws = new WebSocket('ws://localhost:1337', 'echo-protocol');

  ws.onopen = function (event) {
    console.log('Connection opened.');
  }

  ws.onmessage = function (event) {
    console.log('Response from server: ' + event.data);
  }

  ws.onclose = function (event) {
    console.log('Connection closed.');
  }

  ws.onerror = function (event) {
    console.log('An error occurred. Sorry for that.');
  }

  WebSocket.prototype.sendMessage = function (message) {
    this.send(message);
    console.log('Message sent: ' + message);
  }

  document.getElementById('send').addEventListener('click', function (event) {
    event.preventDefault();
    var message = document.getElementById('message').value;
    ws.sendMessage(message);
  });

})();
