import * as express from 'express';
import {connect} from "mongoose";
import * as bodyParser from "body-parser";
import {User} from "./mongo/User";
import {compare, genSalt, hash} from "bcrypt";
import {sign, verify} from "jsonwebtoken";
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const {username, password: pass, name} = req.body;

    const user = await User.findOne({username});

    if (user) return res.status(400).send({message: 'username exists!'});

    // create new user
    const password = await hash(pass, await genSalt(10));

    const newUser = await User.create({
        username, name, password
    });

    // generate token
    const token = await sign({_id: newUser._id}, process.env.TOKEN);

    return res.send({
        user: newUser, token
    })
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (!user) return res.status(400).send({message: 'wrong info'});

    // check for password
    const passwordIsTrue = await compare(password, user.password);

    if (!passwordIsTrue) return res.status(400).send({message: 'wrong info'});

    // generate token
    const token = await sign({_id: user._id}, process.env.TOKEN);

    return res.send({
        user: user, token
    })
});

connect(process.env.DB || 'mongodb://admin:secret@localhost:27017/noodle?authSource=admin', {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('connected to db')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})