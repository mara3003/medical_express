import {Message} from "../models/messageSchema.js"
import ErrorHandler from '../middleware/errorMiddleware.js'

import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

export const sendMessage = catchAsyncErrors( async(req, res, next)=>{
    const {firstName, lastName, email, phone, message} = req.body;

    if(firstName===undefined || lastName===undefined || email===undefined || phone===undefined || message===undefined){
        return next(new ErrorHandler("Please fill full form!", 400));
    }

        await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success:true,
            message:"Message sent successfully"
        });
    
})

export const getAllMessages  = catchAsyncErrors( async(req, res, next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages
    })
} )