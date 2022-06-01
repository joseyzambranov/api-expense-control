const router = require("express").Router()

router.get("/",(req,res)=>{
    res.send("user test is successfull")
})

router.post("/usertest",(req,res)=>{
    const username= req.body.username
    console.log(username)
})

module.exports = router