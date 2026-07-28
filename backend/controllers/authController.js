import jwt from "jsonwebtoken";
import * as AuthModel from "../models/authModel.js";

export async function registerUser(req, res) {
    try {
        const user = await AuthModel.registerUser(req.body);
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await AuthModel.loginUser(email, password);

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
    );

    return res.json({
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email },
    });
}
