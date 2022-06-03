const router = require("express").Router()

const Input = require("../models/Input")
const {verifyToken, verifyTokenAndAuthorization} =require("./verifyToken")

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

//UPDATE

router.put("/:id",verifyToken,async(req,res)=>{
     try{

        const updateInput=await Input.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        })
        res.status(200).json(updateInput)

     }catch(err){
         res.status(500).json(err)
     }
})

//DELETE

router.delete("/:id",verifyToken,async(req,res)=>{
    try{

        await Input.findByIdAndDelete(req.params.id)
        res.status(200).json("Input has been deleted...")

    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER INPUT

router.get("/find/:userId",verifyToken, async(req,res)=>{
    try{
        const inputs = await Input.find({
            userId:req.params.userId
        })
        res.status(200).json(inputs)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER INPUT TWO FIRST

router.get("/start/:userId",verifyToken,async(req,res)=>{
    try{

        const inputs = await Input.find({
            userId:req.params.userId
        }).sort({_id:-1}).limit(2)
        res.status(200).json(inputs)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router