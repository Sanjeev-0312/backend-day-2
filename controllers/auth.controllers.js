import User from "../models/user.schema.js";
export const Register = async(req,res) =>{
    try{
        const { name, email, password, confirmPassword}=req.body;
        console.log(name, email, password, confirmPassword);
       if(!name || !email  || !password || !confirmPassword){
        return res.send("All data mandatory,");
       }
       if(password !== confirmPassword){
        return res.send("password not matched");
       }
    

       const newUser = User({
        name: name,
        email: email,
        password: password,
      });
      console.log(newUser, "newUser");
      const responseFromDatabase = await newUser.save();

      console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registrerationc omplted." });

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
     
