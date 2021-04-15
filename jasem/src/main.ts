import * as express from 'express';
import {connect} from "mongoose";
import * as bodyParser from "body-parser";
import {authMiddleware, login, register, verifySocket} from "./auth";
import {Label} from "./mongo/Label";
import {Time} from "./mongo/Time";
require('dotenv').config();
import * as cors from 'cors';
import {User} from "./mongo/User";
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}));


const server = app.listen(process.env.PORT || 4000, () => {
    console.log('server is running')
});

const IOServer = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const io = IOServer
    .use(verifySocket)
    .on('connection', async (socket) => {

        const user = await User.findOne({_id: socket.decoded._id});
        
        socket.join(user.username);

        console.log('someone connected with id : ' + user.username);

    })

app.options('*', cors())

app.get('/status', (req, res) => {
    return res.send({
        status: process.env.STATUS
    });
});

app.post('/register', register);

app.post('/login', login);

app.get('/label', authMiddleware, async (req, res) => {
    // @ts-ignore
    const user = req.user;

    const labels = await Label.find().where('_id').in(user.label).populate('time').exec();

    return res.send({
        labels
    })
});


app.post('/label', authMiddleware, async (req, res) => {
    // @ts-ignore
    const user = req.user;

    const {name, color} = req.body;


    const label = await Label.create({
        color, name
    });

    user.label.push(label._id)

    await user.save();

    io.to(user.username).emit('new-label', label);

    return res.send({
        label
    })
});


app.put('/label/:id', authMiddleware, async (req, res) => {
    // @ts-ignore
    const user = req.user;

    const {name, color} = req.body;

    const {id} = req.params;

    const label = await Label.findOne({_id: id}).update({
        color, name
    });

    const emitLabel = await Label.findOne({_id: id}).populate('time').exec();

    io.in(user.username).emit('update-label', emitLabel);

    return res.send({
        label
    })
});


app.get('/label/:id', authMiddleware, async (req, res) => {

    const {id} = req.params;

    const label = await Label.findOne({_id: id}).populate('time').exec();

    return res.send({
        label
    })
});

app.post('/time/new', authMiddleware, async (req, res) => {
    // @ts-ignore
    const user = req.user;

    const {label, time} = req.body;

    const createdTime = await Time.create({
        time
    });

    const createdLabel = await Label.findOne({_id: label});

    createdLabel.time.push(createdTime._id);

    await createdLabel.save();

    const emitLabel = await Label.findOne({_id: label}).populate('time').exec();

    io.in(user.username).emit('update-label', emitLabel);

    res.send({
        time: createdTime
    })
})



connect(process.env.DB || 'mongodb://admin:secret@localhost:27017/noodle?authSource=admin', {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('connected to db')
})