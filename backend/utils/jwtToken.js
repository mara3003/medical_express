

export const generateToken = (user, message, statusCode, res) =>{
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    console.log(24 *60*60*100000);
    res.status(statusCode).cookie(cookieName, token, {
        expiresIn: 24 *60*60*1000,
        httpOnly:true
    }).json({
        success:true,
        message,
        user,
        token
    })
}