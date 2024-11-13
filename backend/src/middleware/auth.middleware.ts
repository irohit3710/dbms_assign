import express from 'express'
import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/environment';
import { IUser } from '../model/user.model';

export class AuthMiddleWare{
    static async apiAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const authHeader = req.headers['authorization'];
            // console.log("authHeader : ",authHeader)
            if(!authHeader){
                return res.status(400).send('Unauthorized user');
            }
            
            jwt.verify(authHeader, CONFIG.jwt.secret,(err, decoded)=>{
                if(err){
                    return res.status(400).send('Unauthorized user');
                }
                
                if(typeof decoded === 'object' && decoded!==null){
                    req.user = decoded as IUser;
                    // console.log(decoded);
                    next();
                }
                else{
                    return res.status(400).send('Unauthorized user');
                }
            })
        } catch (error) {
            next(error);
        }
    }
}