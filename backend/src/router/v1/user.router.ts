import { Router } from "express";
import { UserController } from "../../controller/user.controller";


export default class UserRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes()
    }

    public routes(): void {
        //GET
        this.router.get('/get/email/:email', UserController.getUserByEmail);
        this.router.get('/get/username/:username', UserController.getUserByUsername);
        this.router.get('/get/all', UserController.getAllUsers);

        //POST
        this.router.post('/signup', UserController.createUser);
        this.router.post('/signin/username', UserController.loginAuthByUsername)
        this.router.post('/signin/email', UserController.loginAuthByEmail);
    }
}