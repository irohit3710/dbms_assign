import { CONFIG } from "../config/environment";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const removeEmpty = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};


export const hashPassword = async (password: any) => {
  try {
    const salt = CONFIG.BCRYPT_SALT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log('Error hassing password');
  }
}

export const generateJwtToken = (id:any)=>{
  try {
    const payload = {
      userId: id,
    }

    const token = jwt.sign(payload, CONFIG.jwt.secret,{
      expiresIn: CONFIG.jwt.options.expiresIn,
    })

    return token;
  } catch (error) {
    console.log("Error generating jwt token");
  }
}