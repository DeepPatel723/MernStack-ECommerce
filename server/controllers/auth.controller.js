import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();
        return res.status(200).json({
            success:true,
            message:"Register Successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Some Error Occured In Register"
        })
    }
};

export const login = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Some Error Occured In Login"
        })
    }
}