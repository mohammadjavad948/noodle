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

    return res.send({
        label
    })
});


app.put('/label/:id', authMiddleware, async (req, res) => {

    const {name, color} = req.body;

    const {id} = req.params;

    const label = await Label.findById(id).update({
        color, name
    });

    return res.send({
        label
    })
});


app.get('/label/:id', authMiddleware, async (req, res) => {

    const {id} = req.params;

    const label = await Label.findById(id).populate('time').exec();

    return res.send({
        label
    })
});




connect(process.env.DB || 'mongodb://admin:secret@localhost:27017/noodle?authSource=admin', {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('connected to db')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})