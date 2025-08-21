import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    try {
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler("User already Registered!", 400));
        }

        const user = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient" });
        generateToken(user, "User Registered!", 201, res);
    } catch (error) {
        console.log(error?.message)
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid Email Or Password!", 400));
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid Email Or Password!", 400));
        }
        if (role !== user.role) {
            return next(new ErrorHandler(`User Not Found With This Role!`, 400));
        }
        generateToken(user, "Login Successfully!", 200, res);
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    try {
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
        }

        const admin = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role: "Admin" });
        res.status(201).json({
            success: true,
            message: "New Admin Registered!",
            admin,
        });
    } catch (error) {
        return next(new ErrorHandler(error?.message || "Internal Server Error!", 500));
    }
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment || !docAvatar) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    try {
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return next(
                new ErrorHandler("Doctor With This Email Already Exists!", 400)
            );
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            docAvatar.tempFilePath, { folder: "pabs" }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(
                "Cloudinary Error:",
                cloudinaryResponse.error || "Unknown Cloudinary error"
            );
            return next(
                new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
            );
        }
        const doctor = await User.create({
            firstName, lastName, email, phone, nic, dob, gender, password, role: "Doctor", doctorDepartment,
            docAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });
        res.status(201).json({
            success: true,
            message: "New Doctor Registered",
            doctor,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    try {
        const doctors = await User.find({ role: "Doctor" });
        res.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Admin Logged Out Successfully.",
    });
});

// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Patient Logged Out Successfully.",
    });
});



export const refreshAccessToken = catchAsyncErrors(
    async (req, res, next) => {
        console.log("refresh controller")
        const incomingRefreshToken = req.body.refreshToken
        if (!incomingRefreshToken) {
            return next(new ErrorHandler("No refresh token supplied!", 400))
        }
        try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )
            const user = await User.findById(decodedToken?.id)
            if (!user) {
                return next(new ErrorHandler("Invalid refresh token!", 400))
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
            const rToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_EXPIRE })
            return res.status(200).json({ message: "New access and refresh token sent!", success: true, token: token, newRefreshToken: rToken })
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }

    }
)