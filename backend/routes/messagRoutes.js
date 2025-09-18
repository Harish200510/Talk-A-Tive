const express=require("express")
const authMiddleware = require("./../middlewares/authMiddleware");
const messageController=require("./../controllers/messageController")

const router=express.Router();


router.route('/').post(authMiddleware.protect,messageController.sendMessage)
// router.route('/:chatId').get(authMiddleware.protect,allMessage)


module.exports=router;