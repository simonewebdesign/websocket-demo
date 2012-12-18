(function(){

  var ws = new WebSocket("ws://localhost:1337");

  ws.onopen = function(ev) {
    console.log('Connection opened.');
  }

  ws.onmessage = function(ev) {
    console.log('Response from server: ' + ev.data);
  }

  ws.onclose = function(ev) {
    console.log('Connection closed.');
  }

  ws.onerror = function(ev) {
    console.log('An error occurred. Sorry for that.');
  }

  WebSocket.prototype.sendMessage = function(msg) {
    this.send(msg);
    console.log('Message sent: ' + msg);
  }

  var sendBtn = document.getElementById('send');
  sendBtn.addEventListener('click', function(ev) {
    var message = document.getElementById('message').value;
    ws.sendMessage(message);
    ev.preventDefault();
  });

})();