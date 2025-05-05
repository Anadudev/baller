// src/types/socketTypes.ts

export interface ServerToClientEvents {
    'chat message': (msg: string) => void;
    'user connected': (userId: string) => void;
    'user disconnected': (userId: string) => void;
    // Define other server-to-client events here
}

export interface ClientToServerEvents {
    'chat message': (msg: string) => void;
    'join room': (room: string) => void;
    // Define other client-to-server events here
}

export interface InterServerEvents {
    'ping': () => void;
    // Define other inter-server events here
}

export interface SocketData {
    userId: string;
    // Define other custom socket data properties here
}