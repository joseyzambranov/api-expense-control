require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = process.env.PORT||5000
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")

mongoose.connect(process.env.MONGO_CONECT)
.then(()=>console.log("DB connection Successfull"))

app.use(express.json())
app.use("/api/test",userRouter)
app.use("/api/auth",authRouter)

app.listen(port,()=>{
    console.log("API Server expense control running")
})