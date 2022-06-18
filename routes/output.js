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

//UPDATE

/*router.put("/:id",verifyToken,async(req,res)=>{

    Output.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{
        new:true
    },(err,text)) 

    if(err) return res.status(500).json(err)
    
    res.status(200).json(text)

    

})*/

router.put("/:id",verifyToken,async(req,res)=>{
try{
    const updateOutput= await Output.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{
        new:true
    }) 

    res.status(200).json(updateOutput)

}catch(err){
    res.status(500).json(err)
}
})

//DELETE

/*router.delete("/:id",verifyToken,(req,res)=>{
    Output.findByIdAndDelete(req.params.id,(err,text)=>{
        if(err) return res.status(500).json(err)

        res.status(200).json("Output has been deleted....")
    })
})*/
router.delete("/:id",verifyToken,async(req,res)=>{
    try{

        await Output.findByIdAndDelete(req.params.id)
        res.status(200).json("Output has been deleted...")

    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER OUTPUT

router.get("/find/:userId",verifyToken,(req,res)=>{
    Output.find({
        userId:req.params.userId
    },(err,text)=>{
        if(err) return res.status(500).json(err)

        res.status(200).json(text)
    })
})

//GET USER OUTPUT TWO FIRST

router.get("/start/:userId",verifyToken,async(req,res)=>{

    try{
        const output = await Output.find({userId:req.params.userId}).sort({_id:-1}).limit(2)
        res.status(200).json(output)



    }catch(err){
        res.status(500).json(err)
    }
   
       /*Output.find({userId:req.params.userId.sort({_id:-1}).limit(2)},(err,text)=>{
            if(err) return res.status(500).json(err)

            res.status(200).json(text)
       })*/
       

  
})

module.exports = router