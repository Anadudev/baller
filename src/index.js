"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Or specify your client's origin
        methods: ['GET', 'POST']
    }
});
const PORT = process.env.PORT || 3000;
// Basic Express route
app.get('/', (req, res) => {
    res.send('<h1>Socket.IO Server</h1>');
});
// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});
server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
