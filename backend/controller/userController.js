import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/errorMiddleware.js"
import {User} from "../models/userSchema.js"
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        CNP,
        role } = req.body;

    if (firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        phone === undefined ||
        password === undefined ||
        gender === undefined ||
        dob === undefined ||
        CNP === undefined ||
        role === undefined) {
        return next(new ErrorHandler("Please fill full form", 400));
    }

    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User already registered!", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        CNP,
        role
    });

    generateToken(user, "User registred!", 200, res);

});


export const login = catchAsyncErrors(async(req, res, next)=>{

    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Pease provide all details!", 400));
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords do not match!", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password or email!", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        
        return next(new ErrorHandler("Invalid password or email!", 400));
    }

    if(role !== user.role){
        return next(new ErrorHandler("User with this role is not found!", 400));
    }

    generateToken(user, "User logged in successfully!", 200, res)

})

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        CNP
     } = req.body;

        if (firstName === undefined ||
            lastName === undefined ||
            email === undefined ||
            phone === undefined ||
            password === undefined ||
            gender === undefined ||
            dob === undefined ||
            CNP === undefined 
            ) {
            return next(new ErrorHandler("Please fill full form", 400));
        }

        const isRegistred = await User.findOne({email});
        if(isRegistred){
            return next(new ErrorHandler("Admin with this email already exists!"));
        }

        const admin = await User.create({firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            CNP,
            role:"Admin"});

            res.status(200).json({
                success:true, 
                message:"New admin registred!"
            });
});


export const getAllDoctors = catchAsyncErrors(async(req, res, next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
})

export const logoutAdmin = catchAsyncErrors(async (req, res, next)=>{
    res.status(200)
    .cookie("adminToken", "",{
        httpOnly:true,
        expires: new Date(Date.now())

    })
    .json({
        success:true,
        message:"User logged out!"
    })
})

export const logoutPatient = catchAsyncErrors(async (req, res, next)=>{
    res.status(200)
    .cookie("patientToken", "",{
        httpOnly:true,
        expires: new Date(Date.now())

    })
    .json({
        success:true,
        message:"User logged out!"
    })
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor avatar required!", 400));
    }

    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported!", 400));
    }

    const { firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        CNP,
        doctorDepartment,
        } = req.body;

        if (firstName === undefined ||
            lastName === undefined ||
            email === undefined ||
            phone === undefined ||
            password === undefined ||
            gender === undefined ||
            dob === undefined ||
            CNP === undefined ||
            doctorDepartment === undefined) {
            return next(new ErrorHandler("Please provide full details", 400));

        }

        const isRegistred = await User.findOne({email});
        if(isRegistred){

            return next(new ErrorHandler(`${isRegistred.role} already exists with this email`, 400));

        }

        const cloudinaryResponse  = await cloudinary.uploader.upload(docAvatar.tempFilePath);

        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary error : ", cloudinaryResponse.error || "Unkown error");
        }
        const doctor = await User.create({

            firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        CNP,
        doctorDepartment,
        role:"Doctor",
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,        
        }

        })
        res.status(200).json({
            success:true,
            message:"New doctor registred!",
            doctor
        })
})
