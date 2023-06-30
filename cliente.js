// client.js
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8081');

ws.on('open', () => {
  console.log('Conectado al servidor');

  ws.send('¡Hola, servidor desde cliente 1!');
});

ws.on('message', (message) => {
  console.log(`Mensaje recibido del servidor: ${message}`);
});

ws.on('close', () => {
  console.log('Desconectado del servidor');
});

function sendMessage(message) {
  ws.send(message);
}
