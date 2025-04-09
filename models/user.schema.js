import {model, Schema} from "mongoose";

const userSchema = new Schema({
    name:{type : String, required: true},
    email:{type : String, required: true},
    passwod:{type : String, required: true},
    phone: {type : Number, default: 9876543210},
});

const User = model("Users", userSchema);

export default User;