import { Router } from "express";
import { UserController } from "../../controller/user.controller";
import { AuthMiddleWare } from "../../middleware/auth.middleware";


export default class UserRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes()
    }

    public routes(): void {
        //GET
        this.router.get('/get/email/:email',AuthMiddleWare.apiAuthMiddleware, UserController.getUserByEmail);
        this.router.get('/get/username/:username',AuthMiddleWare.apiAuthMiddleware, UserController.getUserByUsername);
        this.router.get('/get/all',AuthMiddleWare.apiAuthMiddleware, UserController.getAllUsers);
        this.router.get('/get',AuthMiddleWare.apiAuthMiddleware, UserController.getUserById);

        //POST
        this.router.post('/signup', UserController.createUser);
        this.router.post('/signin/username', UserController.loginAuthByUsername)
        this.router.post('/signin/email', UserController.loginAuthByEmail);

        //PUT
        this.router.put('/update/:id', UserController.updateUser);

        //Delete
        this.router.delete('/delete/:id', UserController.deleteUser);
    }
}