import nodemailer from "nodemailer"

export const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
    },
})

interface MailType {
    to: string;
    subject: string,
    text: string
}

export default async function sendMail({ to, subject, text }: MailType) {
    await transpoter.sendMail({
        from: process.env.GMAIL_FROM,
        to,
        subject,
        html: `<p>You requested a password reset.</p>
    <p>${text}</p>
    
    <p>If you did not request this, please ignore this email.</p>`
    })
}