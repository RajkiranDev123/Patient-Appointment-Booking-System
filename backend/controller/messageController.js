import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {

    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill All fields!", 400));
    }
    try {
        await Message.create({ firstName, lastName, email, phone, message });
        res.status(201).json({
            success: true,
            message: "Message Sent!",
        });
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error?.message || "Internal Server Error!", 500));
    }
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    try {
        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});