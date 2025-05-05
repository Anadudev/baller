import express from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from '../config/swaggerOptions';

const app = express();
const server = http.createServer(app);
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const io = new Server(server, {
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg: string) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
