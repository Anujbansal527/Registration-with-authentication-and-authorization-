const express = require("express");
const router = express.Router();

//importing controllers
const {login,singup} = require("../Controllers/Auth");

//addin middleware path
const {auth,isStudent,isAdmin} = require("../middleware/auth");


//normal routes
router.post("/login",login);
router.post("/singup",singup);

//single middleware
router.get('/protected', auth , (req, res) =>{
    res.json({
        sucess:true,
        message:"welcome to test route"
    })
})


//creating protected routes
router.get("/student",auth,isStudent , (req,res)=>{
    res.json({
        sucess:true,
        message:"welcome to protected route for student"
    })
})

router.get("/admin",auth,isAdmin , (req,res)=>{
    res.json({
        sucess:true,
        message:"welcome to protected route for admin"
    })
})
module.exports = router;