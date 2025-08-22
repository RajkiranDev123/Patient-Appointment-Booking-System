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
    const page = req.headers.page || 1
    const ITEM_PER_PAGE = 5

    try {
        const totalDocs = await Message.countDocuments()
        const pageCount = Math.ceil(totalDocs / ITEM_PER_PAGE)//pageCount is total pages 10/5=2 pages
        const skip = (page - 1) * ITEM_PER_PAGE //(1-1)*5 => 0*5==0

        const messages = await Message.find().skip(skip).limit(ITEM_PER_PAGE)
        res.status(200).json({
            success: true,
            messages,
            pagination: { pageCount, totalMessages: totalDocs }
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});