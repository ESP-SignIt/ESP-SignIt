import express from 'express';
import path from 'path';
import http from 'http';
import WebSocket from 'ws';
 
const app = express();
const PORT = 3000;
 
app.use('/textures', express.static(path.join(__dirname, 'textures')));
 
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
 
wss.on('connection', (ws) => {
  console.log('Client connected');
 
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
 
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
 
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});