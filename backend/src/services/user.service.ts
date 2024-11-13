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
        return await userModel.find({},'-password');
    }

    static async getUserById(id:any){
        return await userModel.findById(id,'-password');
    }

    static async deleteById(id:any){
        return await userModel.findByIdAndDelete(id);
    }

    static async updateUser(payload:any, id:any){
        return await userModel.findByIdAndUpdate(id,{
            $set: payload,
        },{new: true});
    }
}