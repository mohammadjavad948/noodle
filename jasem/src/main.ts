import * as express from 'express';
import {Socket} from "socket.io";
const socketIo = require('socket.io');

const app = express();


const server = app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})

global.io = socketIo(server)

global.io.on('connection', (socket: Socket) => {

});
