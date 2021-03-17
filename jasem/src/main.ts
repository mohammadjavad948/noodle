import * as express from 'express';
import {Socket} from "socket.io";
import {connect} from "mongoose";
const socketIo = require('socket.io');

const app = express();


connect(process.env.DB || 'mongodb://admin:secret@localhost:27017/noodle?authSource=admin', {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('connected to db')
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})

global.io = socketIo(server)

global.io.on('connection', (socket: Socket) => {

});
