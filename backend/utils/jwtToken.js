export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const refreshToken = user.generateRefreshToken();

    // Determine the cookie name based on the user's role
    const tokenName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

    res.status(statusCode).json({
            success: true,
            message,
            user,
            token,
            tokenName,
            refreshToken
        });
};
