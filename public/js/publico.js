
import express from 'express';
import http from 'http';
import { configureSocket } from './sockets/controller.js';

const app = express();
const server = http.createServer(app);

// Configurar la carpeta pública
app.use(express.static('public'));

// Configurar Socket.IO
configureSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

console.log('Público HTML')