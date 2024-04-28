import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true, 
        minLength:[3,"First Name must contain at least 3 characters!\n"]
    },
    lastName:{
        type: String,
        required: true, 
        minLength:[3,"Last Name must contain at least 3 characters!\n"]
    },

    email:{
        type: String,
        required: true, 
        validate: [validator.isEmail, "Please provide a valid Email!\m"]
    },

    phone:{
        type: String,
        required: true, 
        minLength:[10,"Phone number  must contain exact 10 digits!\n"]
    },

    message:{
        type: String,
        required: true,
        minLength: [10, "Message must contain at least 10 characetrs!\n"]
    },

});

export const Message = mongoose.model("Message", messageSchema);