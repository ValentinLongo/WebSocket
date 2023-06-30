// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });
const clients = new Map(); // Cambiamos a un mapa para almacenar los clientes

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  // Generamos un identificador único para el cliente
  const clientId = generateClientId();
  clients.set(clientId, ws);

  ws.send(`Conexión exitosa. ¡Hola, cliente ${clientId}!`);

  ws.on('message', (message) => {
    console.log(`Mensaje recibido del cliente ${clientId}: ${message}`);
    broadcastMessage(clientId, message);
  });

  ws.on('close', () => {
    console.log(`Cliente ${clientId} desconectado`);
    clients.delete(clientId);
  });
});

function broadcastMessage(senderId, message) {
  clients.forEach((client, clientId) => {
    if (clientId !== senderId) { // Evitamos enviar el mensaje al mismo cliente que lo envió
      client.send(`Cliente ${senderId} dice: ${message}`);
    }
  });
}

function generateClientId() {
  return Math.random().toString(36).substr(2, 9);
}
