import userModel from "../model/user.model";

export class UserService{
    static async createUser(payload:any){
        return await userModel.create(payload);
    }

    static async getUserByUsername(username:any){
        return await userModel.findOne({username: username});
    }

    static async getUserByEmail(email: any){
        return await userModel.findOne({email: email});
    }

    static async getAllUsers(){
        return await userModel.find();
    }
}