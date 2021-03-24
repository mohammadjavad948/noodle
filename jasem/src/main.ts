import * as express from 'express';
import {connect} from "mongoose";
import * as bodyParser from "body-parser";
import {User} from "./mongo/User";

const app = express();
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const {username, password, name} = req.body;

    const user = await User.find({username});

    if (user) return res.status(400).send({message: 'username exists!'});

});

connect(process.env.DB || 'mongodb://admin:secret@localhost:27017/noodle?authSource=admin', {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('connected to db')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})