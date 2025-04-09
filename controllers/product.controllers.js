export const CreateProduct=(req, res) =>{
    try{
        return res.send("fetch the product in dashbord");
    }catch(error){
        console.log(error, " error finding the api products. call the cart.");
        return res.send(error)
    }
  }