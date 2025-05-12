import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const checkUser = await User.findOne({email});

        if (!checkUser) {
            return res.json({
                success: false,
                message:"User Already exists with the same email! Please try again"
            })
        }
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
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message:"User doesn't exists! Please register first"
            });
        };

        const checkPasswrdMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswrdMatch) {
            return res.json({
                success: false,
                message:"Incorrect password! Please try again"
            });
        };

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            name: checkUser.name
        },
        "CLIENT_SECRET_KEY",
        {expiresIn: "60m"}
    );

    res.cookie("token",token,{httpOnly: true, secure: false}).json({
        success: true,
        message: "Logged in successfully",
        user:{
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id,
            name: checkUser.name
        }
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"Some Error Occured In Login"
        })
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!"
    })
};

export const authMiddleware = async (req, res, next) => {
    const token = req.cookie.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message:"Unauthorised user!",
        });
    };

    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message:"Unauthorised user!"
        });
    }
};