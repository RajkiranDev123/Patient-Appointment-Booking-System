import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";

export const getMetaAppointments = catchAsyncErrors(async (req, res, next) => {

    const dateRange = req.headers["date-range"]
    const dateFilter = {};

    if (typeof dateRange === "string" && dateRange.includes("--")) {
        const [start, end] = dateRange.split("--");

        const startDate = new Date(start + "T00:00:00Z");
        const endDate = new Date(end + "T23:59:59Z");

        dateFilter.createdAt = {
            $gte: startDate,
            $lte: endDate
        };
        console.log("createdAt:", dateFilter);
    }

    try {
        const [applicationStats, totalAppointments] = await Promise.all([
            Appointment.aggregate([
                {
                    $match: {
                        ...dateFilter
                    }
                },

                {
                    $facet: {
                        pendingCounts: [
                            { $match: { status: "Pending" } },
                            { $count: "count" }
                        ],
                        acceptedCounts: [
                            { $match: { status: "Accepted" } },
                            { $count: "count" }
                        ],
                        rejectedCounts: [
                            { $match: { status: "Rejected" } },
                            { $count: "count" }
                        ],

                    }
                }
            ]),

            // no 2
            Appointment.countDocuments({

                ...dateFilter
            })
        ]);

        const pendingCounts = applicationStats[0].pendingCounts[0]?.count || 0;
        const acceptedCounts = applicationStats[0].acceptedCounts[0]?.count || 0;
        const rejectedCounts = applicationStats[0].rejectedCounts[0]?.count || 0;



        res.status(200).json({
            success: true,
            counts: {
                pendingCounts: pendingCounts,
                acceptedCounts: acceptedCounts,
                rejectedCounts: rejectedCounts,

                totalAppointments: totalAppointments
            },
            message: "Meta data for appointments stats fetched!"

        });
    } catch (error) {
        return next(new ErrorHandler(error?.message || "Internal Server Error!", 500))

    }
})
