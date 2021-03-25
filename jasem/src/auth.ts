import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {User} from "./mongo/User";


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