const expressAsyncHandler = require("express-async-handler");
const Message=require("./../Models/messageModel");

const sendMessage = expressAsyncHandler(async(req,res) => {
    //---What are all we need---
    //1)Chat id - on which chat we are gonna send the message
    //2)Actiall Message Itself
    //3)Who is the sender of the message


    const {content,chatId}=req.body;

    //if the content or chatId is missing or not there
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.status(400);
    }

    //creating a new message
    let newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    }

    try {
         let message=await Message.create(newMessage);

         message=await message.populate("sender","name pic").execpopulate();
         message=await message.populate("chat").execpopulate();

    } catch (error) {
        
    }



});

module.exports={sendMessage}
