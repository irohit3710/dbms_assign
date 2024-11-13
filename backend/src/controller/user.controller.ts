import express from 'express'
import bcrypt from 'bcryptjs'
import { generateJwtToken, hashPassword } from '../helper/custom.helper';
import { UserService } from '../services/user.service';

export class UserController{
    static async createUser(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const body = req.body;

            const userByEmail = await UserService.getUserByEmail(body.email);
            if(userByEmail){
                return res.status(404).send('Email already exist');
            }
            
            const userByUsername = await UserService.getUserByUsername(body.username);
            if(userByUsername){
                return res.status(404).send('Username already exist');
            }
            const hashedPasswordValue = await hashPassword(body.password);
            const payload = {
                username: body.username,
                email: body.email,
                password: hashedPasswordValue,
                name: body.name,
            }
            const user  = await UserService.createUser(payload);
            if(!user){
                return res.status(400).send('User not created');
            }
            return res.status(200).send("User created");
        } catch (error) {
            next(error);
        }
    }

    static async getUserByEmail(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const email = req.params.email;
            const user = await UserService.getUserByEmail(email);
            if(!user){
                return res.status(404).send('User not found');
            }
            return res.status(200).send("User already exist");
        } catch (error) {
            next(error);
        }
    }

    static async getUserByUsername(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const username = req.params.username;
            const user = await UserService.getUserByUsername(username);
            if(!user){
                return res.status(404).send('User not found');
            }
            return res.status(200).send("User already exist");
        } catch (error) {
            next(error);
        }
    }

    static async loginAuthByUsername(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user = await UserService.getUserByUsername(username);
            if(!user){
                return res.status(404).send('User not found');
            }
            
            const compare = bcrypt.compare(password, user.password);
            if(!compare){
                return res.status(400).send('Incorrect password');
            }

            const token = await generateJwtToken(user._id);
            return res.status(200).send({message: "Login successfully", token: token});
        } catch (error) {
            next(error);
        }
    }

    static async loginAuthByEmail(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await UserService.getUserByEmail(email);
            if(!user){
                return res.status(404).send('User not found');
            }
            
            const compare = bcrypt.compare(password, user.password);
            if(!compare){
                return res.status(400).send('Incorrect password');
            }

            const token = await generateJwtToken(user._id);
            return res.status(200).send({message: "Login successfully", token: token});
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const user = await UserService.getAllUsers();
            if(!user){
                return res.status(404).send('User not found');
            }
            return res.status(200).send({user});
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const id = req.user._id;
            const user = await UserService.getUserById(id);
            if(!user){
                return res.status(404).send('User not found');
            }
            return res.status(200).send({user});
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const id = req.params.id;
            const user = await UserService.deleteById(id);
            if(!user){
                return res.status(404).send('User not found');
            }
            return res.status(200).send('User deleted');
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const id = req.params.id;
            const payload = req.body;
            const user = await UserService.updateUser(payload, id);
            if(!user){
                return res.status(404).send('User not found');
            }
            return res.status(200).send('User updated');
        } catch (error) {
            next(error);
        }
    }
}
