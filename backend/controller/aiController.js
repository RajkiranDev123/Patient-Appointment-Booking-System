import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";


export const ask = catchAsyncErrors(async (req, res, next) => {
    let question =req.body.question
    let finalQuestion=`i need two best tablets and two best fruits for the ${question},
     answer only in points and no paragraph etc like : Tablet : 1.xyz 2.xyz | Fruits : 1.xyz 2.xyz`
    try {
        const resp = await fetch("https://api.sarvam.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "api-subscription-key": process.env.AI_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "sarvam-m",
                messages: [
                    {
                        role: "user",
                        content: finalQuestion,
                    },
                ],
            }),
        });

        const data = await resp.json();
        return res.status(200).json({
            data: data?.choices?.[0]?.message?.content || "No response found",
            success:true
        })


    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500));
    }
});