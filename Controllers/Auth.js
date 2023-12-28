const bcrypt =require("bcrypt");
const User = require("../Modles/User");

//importing jsonwebtoken
const jwt =require("jsonwebtoken");

//importing .env file 
require("dotenv").config();

exports.singup = async (req,res) =>{
    try 
    {
        const {name,email,password,role} =req.body;
        const existingUser = await User.findOne({email});
             
        if(existingUser)
        {
            return res.status(400),json(
                {
                    sucess:false,
                    message:"user already exists"
                })
        }

        let hashedPassword ;
        try
        {
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err)
        {
            return res.status(500).json({
                sucess:false,
                message:"error hashing the password"
            })
        }

        const user = await User.create({
            name, email, password : hashedPassword , role
        })

        return res.status(200).json({
            sucess:true,
            message:"User created Sucessfull"
        })
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            sucess:false,
            message:"Server Error"
        })
    }
}

exports.login = async (req,res) =>{
    try{
        const {email,password} =req.body;
        if(!email || !password )
        {
            return res.status(400).json({
                sucess:false,
                message:'please provide an email and a password'
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return  res.status(401).json({
                success: false,
                message:"User is not register"
            })
        }

        //creating payload

        const playload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        //varify password and generate jwt token
        if(await bcrypt.compare(password,user.password))
        {
            //creating token
            let token=jwt.sing(payload,//payload we created 
                process.env.JWT_SECRETE,///secrete key through .env file
                {
                    expiresIn: "2h",//expire in 2 hour
                })

            user = user.toObject();
//converting databse data into object

            user.token =token;//creating token in user data base and send token to user 
            user.password = undefined ; //undefining password to save authentication (password removing from user on=bject not from database)

            //creating cookies
            //creating options
            const options = {                   //3 days 24 hr 60 min 60 sec 1000 mili sec
                 expires:new Date(Date.now() + 3*24*60*60*1000 ),
                 httponly:true,
            }
            res.cookie("token",token,options).status(200).json({

                success:true,
                token,
                user,
                message:"User Logged In Sucessfully"
            })
                        //name // value //option we created
        }
        else
        {
            res.status(403).json({
                sucess:false,
                message:"Incorrect Password"
            })
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"login failed"
        })
    }
}

