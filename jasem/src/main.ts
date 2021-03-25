import * as express from 'express';
import {connect} from "mongoose";
import * as bodyParser from "body-parser";
import {authMiddleware, login, register} from "./auth";
import {Label} from "./mongo/Label";
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

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

    const labels = await Label.find({ _id: { $in : user.label } }).populate('time');

    return res.send({
        labels
    })
});

connect(process.env.DB || 'mongodb://admin:secret@localhost:27017/noodle?authSource=admin', {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('connected to db')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})