import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: config.gmail.emailAdmin,
        pass: config.gmail.emailPass
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
});

export const sendRecoveryPass = async(userEmail, token)=>{
    const link = `http://localhost:8080/reset-password?token=${token}`;
    await transporter.sendMail({
        from: config.gmail.emailAdmin,
        to: userEmail,
        subject: 'Reset password',
        html: 
            `
                <div>
                <h2> You have requested a password change </h2>
                <p> Click here to reset password </p>
                <a href="${link}">
                <button> RESET PASSWORD </button>
                </a>        
                </div>
            `
    })
};

export const generateEmailToken = (email, expireTime)=>{
    const token = jwt.sign({email}, config.gmail.emailToken, {expiresIn:expireTime})
    return token
}

export const verifyEmailToken = (token) =>{
    try {
        const info = jwt.verify(token, config.gmail.emailToken);
        return info.email;
    } catch (error) {
        console.log(error.message)
        return null
    }
}