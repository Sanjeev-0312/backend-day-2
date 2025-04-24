import User from "../models/user.schema.js";

import bcrypt from "bcrypt";
export const Register = async (req, res) => {
  try {
    console.log(req.body,"req.body");
    // console.log("Incoming request body:", req.body);
    // const { name, email, password, confirmPassword } = req.body.userData;
    const { name, email, password, confirmPassword } = req.body.userData ;
    console.log(name, email, password, confirmPassword);
    if (!name || !email || !password || !confirmPassword) {
      return res.json({ success: false, message: "All data mandatory," });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.json({
        success: false,
        message: "password not matched"
      })
    }

    //  const isEmailExist = await User.find({email: email});
    //  console.log(isEmailExist, "isEmailExist");

    //  if(isEmailExist){
    //   return res.send("Email already exist please enter another gmail")
    //  };
    const isEmailExist = await User.find({ email: email });
    //  const isEmailExist = await User.findOne({email: email});
    // const isEmailExist = await User.findById("67f7a19b567f83e3f661075e");
     console.log(isEmailExist, "isEmailExist");

    if (isEmailExist?.length > 0) {

      return res.json({
        success: false,
        message: "Email already exist please enter another gmail"
      });
    }; 

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(password,"password", hashedPassword,"hashedPassword")

    //mongodb

    const newUser = User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log(newUser, "newUser");
    const responseFromDatabase = await newUser.save();

    console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registreration completed." });

  }
  catch (error) {
    console.log("error in register api call.")
    return res.json({ success: false, message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
     const {email , password} = req.body.userData;
     if(!email || !password){
     return res.json({success: false, message: "All fields are mandatory."});
     }
     const isUserExists = await User.findOne({email: email});
     console.log(isUserExists, "isUserExists");
     if(!isUserExists){
      return res.json({success: false, message: "Email is wrong."});
     }

     console.log(password, "req.body.password",isUserExists.password,"isUserExists.password"
    );
     const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password);
     console.log(isPasswordCorrect, "isPasswordCorrent");
     if(!isPasswordCorrect){
      return res.json({ success:false, message: "Password is wrong."});
     }
      return res.json({
      success: true,
      message: "Login Successful"
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({success: false, error: error});
  }
};





