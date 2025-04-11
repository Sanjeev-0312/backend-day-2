import User from "../models/user.schema.js";
export const Register = async(req,res) =>{
    try{
      // console.log(req.body,"req.body");
        const { name, email, password, confirmPassword}=req.body.userData;
        console.log(name, email, password, confirmPassword);
       if(!name || !email  || !password || !confirmPassword){
        return res.json({success : false, message: "All data mandatory,"});
       }
       if(password !== confirmPassword){
        return res.json({
          success : false,
          message: "password not matched"
        });
       }

      //  const isEmailExist = await User.find({email: email});
      //  console.log(isEmailExist, "isEmailExist");

      //  if(isEmailExist){
      //   return res.send("Email already exist please enter another gmail")
      //  };
          const isEmailExist = await User.find({email: email});
      //  const isEmailExist = await User.findOne({email: email});
      // const isEmailExist = await User.findById("67f7a19b567f83e3f661075e");
      //  console.log(isEmailExist, "isEmailExist");

       if(isEmailExist?.length>0){

        return res.json({
          success: false,
          message:"Email already exist please enter another gmail"
        });
       };
    

       const newUser = User({
        name: name,
        email: email,
        password: password,
      });
      console.log(newUser, "newUser");
      const responseFromDatabase = await newUser.save();

      console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registreration completed." });

        }  
        catch (error) {
            console.log("error in register api call.")
            return res.json({success: false, message:error.message});
        }
};

      export const Login = (req, res) =>{
        try{
return res.json({success : true,
  message: "registration completed"
});
        }catch(error){
            console.log(error,"error in register api call.");
            return res.send(error);
        }
      };   
     
