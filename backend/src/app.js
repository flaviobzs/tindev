import express from 'express';
import routes from './routes';
import cors from 'cors';
import io from 'socket.io';
import http from 'http'; // pegar instancia de dentro do express para configurar o socket

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.middlewares();
    this.routes();
  }

  socket() {
    this.io = io(this.server); //faz a chamada para usar o protocolo socket no servidor

    this.io.on('connection', socket => {
      const { user } = socket.handshake.query;

      connectedUsers[user] = socket.id;
    });
  }

  middlewares() {
    this.app.use(express.json()); // entender requisiçoes em formato .json
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
