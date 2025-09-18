const express=require('express');
const connectDB=require('./config/db')
const dotenv = require("dotenv");

const colors=require("colors")
const userRoutes=require('./routes/userRoutes')
const chatRoutes=require("./routes/chatRoutes")
const messageRoutes=require("./routes/messagRoutes")
const errorMiddleware=require('./middlewares/errorMiddleware')


dotenv.config()
connectDB()
const app=express()


app.use(express.json())

app.get('/',(req,res)=>{
    res.send("API is Running");
})


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);


const PORT=process.env.PORT || 8000

app.listen(PORT,console.log(`Server Started on PORT ${PORT}`.yellow.bold))