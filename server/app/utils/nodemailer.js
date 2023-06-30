require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, secure: true, auth: {
        user: process.env.SMTP_USER, pass: process.env.SMTP_PASS
    }
});

async function sendRegistrationThankYouEmail(fullName, email) {
    try {
        const info = await transporter.sendMail({
            from: `${process.env.NAME_APP} <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: "Thank You for Registering",
            html: `<p>Hello ${fullName},</p>
                <p>Thank you for registering an account with ${process.env.NAME_APP}. We are excited to have you as a member of our community!</p>
                <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
                <p>Thank you once again for joining us!</p>
                <p>Best regards,</p>
                <p>${process.env.NAME_APP}</p>`,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}


async function sendResetPasswordEmail(fullName, email, token) {
    try {
        const info = await transporter.sendMail({
            from: `${process.env.NAME_APP} <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Hello ${fullName},</p>
                <p>We have received a request to reset the password for your account. To proceed with the password reset process, please click on the link below:</p><br>
                <p>Visit: http://localhost:9000/reset-password/${token}</p>
                <p>If you did not initiate this request, you can disregard this email. No further action is required.</p>
                <small style="font-style: italic">Noted: Link reset password is valid in 5 minutes</small>
                <p>Thank you.</p><br>
                <p>Best regards,</p>
                <p>${process.env.NAME_APP}</p>`,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = {
    sendResetPasswordEmail, sendRegistrationThankYouEmail
};
