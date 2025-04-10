import User from "../models/user.schema.js";
export const Register = async(req,res) =>{
    try{
      console.log(req.body,"req.body");
        const { name, email, password, confirmPassword}=req.body;
        console.log(name, email, password, confirmPassword);
       if(!name || !email  || !password || !confirmPassword){
        return res.send("All data mandatory,");
       }
       if(password !== confirmPassword){
        return res.send("password not matched");
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

       if(isEmailExist){
        return res.send("Email already exist please enter another gmail")
       };
    

       const newUser = User({
        name: name,
        email: email,
        password: password,
      });
      console.log(newUser, "newUser");
      const responseFromDatabase = await newUser.save();

      console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registreration complted." });

        }  
        catch (error) {
            console.log("error in register api call.")
            return res.send(error);
        }
      };

      export const Login = (req, res) =>{
        try{
return res.send("registration completed");
        }catch(error){
            console.log(error,"error in register api call.");
            return res.send(error);
        }
      };   
     
