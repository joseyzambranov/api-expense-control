const router = require("express").Router()

const  Output = require("../models/Output")
const { verifyToken } = require("./verifyToken")

//CREATE

router.post("/",verifyToken, (req,res)=>{
    const newOutput = new Output(req.body)
 newOutput.save((err,doc)=>{
     if(err) return res.status(500).json(err)

     res.status(200).json(doc)
 })
})

/*router.post("/",verifyToken,async(req,res)=>{
    const newOutput = new Output(req.body)
    try{

        const saveOutput = await newOutput.save()
        res.status(200).json(saveOutput)

    }catch(err){
        res.status(500).json(err)
    }
})*/

module.exports = router