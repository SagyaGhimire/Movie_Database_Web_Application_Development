import * as AuthModel from "../models/authModel.js";


export async function registerUser(req, res){
    const User = await AuthModel.registerUser(req.body);
}

export async function loginUser(req, res){
    const { email, password } = req.body;
    const user = await AuthModel.loginUser(email, password);
    if (user) {
        // Generate JWT token or handle successful login
    } else {
        // Handle failed login
    }
}
