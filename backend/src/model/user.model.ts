import { Schema, Document, model} from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string, 
    username: string,
}


const userSchema = new Schema<IUser>({
    name:{type: String},
    email:{type: String, required: true},
    password:{type: String, required: true},
    username:{type: String, required: true},
}, {
    collection: "user", 
    versionKey: false,
    timestamps: true
})

export default model<IUser>("user", userSchema);