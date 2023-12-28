//role is to check is person is authenticate user or not

const jwt = require("jsonwebtoken");

require("dotenv");


exports.auth = (res,req,next) =>{
    try{
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                sucess:false,
                message:"token not found",
            });
        }

        //varify the token
        try
        {
            const decode = jwt.verify(token,process.env.JWT_SECRETE);
            //check what we get from jwt token "decode"
            console.log(decode);
            //storing data in user while req
            req.user = decode;
                    //these decode get object of user where role is present to check
        }      
        catch(error)
        {
            return res.status(401).json({
                sucess:false,
                message:"token is invalid"
            })
        }
        //to change middleware
        next();
    }
    catch(error)
    {
        return res.status(401),json({
            sucess:false,
            message:"something went wrong"
        })
    }
}



exports.isStudent = (req,res,next) =>
{
    try{
        if (req.user.role !== "Student")
        {
            return res.status(401).json({
                sucess:false,
                message:"this is a protected route for student"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            sucess:false,
            message:"user role is not matching"
        })
    }
}

exports.isAdmin = (req,res,next) =>
{
    try{
        if (req.user.role !== "Admin")
        {
            return res.status(401).json({
                sucess:false,
                message:"this is a protected route for student"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            sucess:false,
            message:"user role is not matching"
        })
    }
}