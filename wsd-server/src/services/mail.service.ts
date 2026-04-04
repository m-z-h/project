import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@websmith.com",
    to: email,
    subject: "Your Websmith Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #007AFF;">Websmith Verification</h2>
        <p>Hello,</p>
        <p>Your one-time password (OTP) for authentication is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1C1C1E; background: #F2F2F7; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #8E8E93;">© ${new Date().getFullYear()} Web Smith Digital. Professional Engineering Services.</p>
      </div>
    `,
  };

  // If no email config, just log to console for development
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("------------------------------------------");
    console.log(`MOCK EMAIL SENT TO: ${email}`);
    console.log(`SUBJECT: ${mailOptions.subject}`);
    console.log(`OTP CODE: ${otp}`);
    console.log("------------------------------------------");
    return true;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
