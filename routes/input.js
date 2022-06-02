const router = require("express").Router()

const Input = require("../models/Input")
const {verifyToken} =require("./verifyToken")

//CREATE

router.post("/",verifyToken,async(req,res)=>{
    const newInput = new Input(req.body)
        try{
            const saveInput = await newInput.save()
            res.status(200).json(saveInput)
        }catch(err){
            res.status(500).json(err)
        }
    
})
module.exports = router