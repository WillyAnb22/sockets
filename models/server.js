import  express from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketsIoServer} from 'socket.io';
import { socketController } from '../socket/controller.js';
class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = http.createServer( this.app );
        this.io     = new SocketsIoServer( this.server );//io toda la info de los sockets conectados.

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        //Define tus rutas aqui
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    sockets() {

        this.io.on('connection', socketController );

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




export {Server};