const router = require("express").Router()
const User = require("../models/User")
const Crypto = require("crypto-js")
const jwt = require("jsonwebtoken")


//REGISTER
router.post("/register", (req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
        img:req.body.img
    })

    newUser.save((err,doc)=>{
        if(err) return res.status(500).json(err)

        res.status(201).json(doc)
    })
})


//LOGIN 

router.post("/login", async (req,res)=>{

    if(req.body.email===""){
        res.status(400).send("email required")
    }
    console.error(req.body.email);

    User.findOne({
        email:req.body.email
    }).then((user)=>{
        if(!user){
            console.error("email not in database");
            res.status(403).send("email not in db")
        }else if(Crypto.AES.decrypt(user.password,process.env.PASS_SEC).toString(Crypto.enc.Utf8)!== req.body.password){
            res.status(401).json("Wrong credentiials!")
        }else{
            const accessToken=jwt.sign({id:user._id},process.env.JWT_SEC,{expiresIn:"3d"})
            const {password,...others}=user._doc
             res.status(200).json({others,accessToken})
            
        }

})
/*try{

    const user = await User.findOne({email:req.body.email})
    !user && res.status(401).json("Wrong credentials!")
    const hashedPassword = Crypto.AES.decrypt(user.password,process.env.PASS_SEC)
    const originalPassword=hashedPassword.toString(Crypto.enc.Utf8)
   originalPassword!== req.body.password && res.status(401).json("Wrong credentiials!")
   const accessToken=jwt.sign({id:user._id},process.env.JWT_SEC,{expiresIn:"3d"})
   const {password,...others}=user._doc
    res.status(200).json({others,accessToken})
}catch(err){
    res.status(500).json(err)
}*/


})

module.exports=router