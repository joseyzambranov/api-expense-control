const User = require("../models/User")
const { verifyTokenAndAuthorization } = require("./verifyToken")

const router = require("express").Router()

//UPDATE

router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.passwword){
        req.body.passwword=CryptoJS.AES.encrypt(
            req.body.passwword,process.env.PASS_SEC
        ).toString()
        
    }try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser)
    }catch(err){res.status(500).json(err)}

})

//DELETE

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await  User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router