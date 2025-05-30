import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { HelloRouteur } from './routes/hello.router';
import path from 'path';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: '*', 
  },
});


const DIST_DIR = path.join(__dirname, '../../client/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.use('/hello', HelloRouteur);

app.get('/', (_req, res) => {
  res.sendFile(HTML_FILE);
});


io.on('connection', (socket) => {
  console.log('Nouveau client connecté');

  socket.on('action', (msg) => {
    console.log('Action reçue', msg);
    socket.broadcast.emit('action', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});


server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
