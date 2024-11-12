import { Router } from "express";
import UserRouter from "./user.router";


export default class V1Router{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes()
    }

    public routes(): void {
        this.router.use('/user', new UserRouter().router);
        
    }
}