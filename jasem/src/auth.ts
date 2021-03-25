import {Request, Response} from "express";
import {sign, verify} from "jsonwebtoken";
import {User} from "./mongo/User";
import {compare, genSalt, hash} from "bcrypt";


export async function authMiddleware(req: Request, res: Response, next){
    const {token} = req.headers;

    try{
        const data = verify(token as string, process.env.TOKEN);

        // @ts-ignore
        const user = await User.findById(data._id);

        if (!user) return res.status(403).send({message: 'auth error'});

        // @ts-ignore
        req.user = user;

        next()
    }catch (e){
        res.status(403).send({message: 'auth error'});
    }
}

export async function login(req: Request, res: Response){
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
}

export async function register(req: Request, res: Response) {
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
}