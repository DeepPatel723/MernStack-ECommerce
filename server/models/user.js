import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:[6,"Password must be at least 6 characters long"]
    },
    role:{
        type:String,
        default:"user",
    },
});

const User = mongoose.model("User", UserSchema);
export default User;