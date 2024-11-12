import { makeRequest, RequestMethods } from "../api/makeRequest";
import { url } from "../api/urls";

export class UserService{
    static async userSignUp(payload){
        return await makeRequest(url.signup,RequestMethods.POST, payload);
    }

    static async userSignIn(payload){
        return await makeRequest(url.login, RequestMethods.POST, payload);
    }

    static async getUserByEmail(email){
        return await makeRequest(url.getUserByEmail+'/'+email, RequestMethods.GET);
    }

    static async getUserByEmail(username){
        return await makeRequest(url.getByUsername+'/'+username, RequestMethods.GET);
    }

    static async getAllUsers(username){
        return await makeRequest(url.getAllUsers, RequestMethods.GET);
    }
}