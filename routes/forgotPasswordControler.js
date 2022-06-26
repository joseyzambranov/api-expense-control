const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Crypto = require("crypto-js");

router.post("/", async  (req,res)=>{

    if(req.body.email==""){
        res.status(400).send("email required")
    }
    console.error(req.body.email);
    User.findOne({
        email:req.body.email
    }).then((user)=>{
        if(user===null){
            console.error("email not in database");
            res.status(403).send("email not in db")
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SEC,{expiresIn:"1h"});
            user.update({
                tokenResetPassword:token
            });

            const recoveryPassword = Crypto.AES.decrypt(user.password,process.env.PASS_SEC)
            const originalPassword=recoveryPassword.toString(Crypto.enc.Utf8)

            const transport = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:`${process.env.EMAIL_ADDRESS}`,
                    pass:`${process.env.EMAIL_PASSWORD}`,
                }
            }) 
            const mailOption = {
                from:"joseyzambranovpe@gmail.com",
                to:`${user.email}`,
                subject:"Link to recovery the password of expense control",
                text:`Estimated ${user.username} , According to your request, we enclose your 
                
                Password : ${originalPassword} 

                so that you can access your Expense Control account.`
            };

            console.log("sending mail");

            transport.sendMail(mailOption,(err,response)=>{
                if(err){
                    console.error("An error occurred",err)
                }else{
                    console.log("Response: ",response)
                    res.status(200).json("the email for the recovery has been sent")
                }
            })

        }
    })
})


module.exports = router;