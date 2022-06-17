const router = require("express").Router()

const InputPlan = require("../models/InputPlan")
const { verifyToken } = require("./verifyToken")

//CREATE

router.post("/",verifyToken,async(req,res)=>{
    const newInput = new InputPlan(req.body)
        try{
            const saveInput = await newInput.save()
            res.status(200).json(saveInput)
        }catch(err){
            res.status(500).json(err)
        }
    
})

//GET USER INPUT PLAN

router.get("/find/:userId",verifyToken, async(req,res)=>{
    try{
        const inputs = await InputPlan.find({
            userId:req.params.userId
        })
        res.status(200).json(inputs)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router