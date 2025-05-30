"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const hello_router_1 = require("./routes/hello.router");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const port = process.env.PORT || 3000;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
// Chemins pour le front
const DIST_DIR = path_1.default.join(__dirname, '../../client/dist');
const HTML_FILE = path_1.default.join(DIST_DIR, 'index.html');
app.use(express_1.default.static(DIST_DIR));
app.use('/hello', hello_router_1.HelloRouteur);
app.get('/', (_req, res) => {
    res.sendFile(HTML_FILE);
});
io.on('connection', (socket) => {
    console.log('🔌 Nouveau client connecté');
    socket.on('action', (msg) => {
        console.log('🎯 action reçue', msg);
        socket.broadcast.emit('action', msg);
    });
    socket.on('disconnect', () => {
        console.log('❌ Client déconnecté');
    });
});
server.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
