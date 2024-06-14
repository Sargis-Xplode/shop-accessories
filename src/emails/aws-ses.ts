import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { ContactDTO } from "src/contact/dto/contact.dto";
import { Message } from "src/messages/messages.model";

require("dotenv").config();

const AdminMail = "no-reply@jobjenius.com";
const InfoEmail = "info@jobjenius.com";
const TelNumber = "+1 123 456 7890";

type MessageData = {
    email: string;
    source: string;
    subject: string;
    body: string;
};

export const changePasswordEmail = async (email: string, userName: string) => {
    let body = `<div style="font-size: 22px; font-weight: 600; color: #1E293B;">Dear ${userName},</div>
  <div style="font-size: 16px; font-weight: 400; color: #64748B;">This is to confirm that the password for your JobJenius account has been successfully changed.</div>
  <div style="font-size: 14px; font-weight: 400; color: #64748B; margin-top: 20px;">
    If you did not change your password, please <a href="${process.env.PUBLIC_URL}/contact" target="_blank" style="text-decoration:none;color:#4860C4;font-size:14px;font-weight:400;">contact us</a> immediately to report any unauthorized access to your account.
  </div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "Password changed successfully",
        body,
    });
};

export const pricingEmail = async (
    email: string,
    userName: string,
    packageName: string,
    profileAccess: number,
    orderDate: Date,
    method: "PayPal" | "Card"
) => {
    let day = orderDate.getDate();
    let month = orderDate.getMonth();

    let body = `<div style="font-size: 22px; font-weight: 600; color: #1E293B;">Hi ${userName},</div>
  <div style="font-size: 14px; font-weight: 400; color: #1E293B; margin: 10px 0;">Thank you for purchasing the ${packageName} package.</div>
  <div style="margin: 5px 0;">
    <div style="font-size: 16px; font-weight: 600; color: #1E293B;">Order date: ${day > 10 ? day : `0${day}`}/${month > 10 ? month : `0${month}`}/${orderDate.getFullYear()}</div>
    <div style="font-size: 16px; font-weight: 600; color: #1E293B;">Payment Method: ${method}</div>
  </div>
  <div style="font-size: 14px; font-weight: 400; color: #1E293B;">You now have exclusive access to profiles of ${profileAccess} outstanding job seekers. If you require any assistance or have questions, our dedicated team is here to help. 
  Feel free to <a href="${process.env.PUBLIC_URL}/contact" target="_blank" style="text-decoration:none;color:#4860C4;font-size:14px;font-weight:400;">contact us</a>. We're committed to ensuring your recruitment process is smooth and successful.</div>
  <div style="font-size: 14px; font-weight: 400; color: #1AC0C6;">Happy hiring!</div>
  <div style="font-size: 14px; font-weight: 600; color: #1E293B; margin-top: 20px;">Need help?</div>
  <div style="font-size: 14px; font-weight: 400; color: #1AC0C6;">Visit our <a href="${process.env.PUBLIC_URL}/faq" target="_blank" style="color:#1E293B;font-size:14px;font-weight:600;">FAQ</a></div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "Package purchase",
        body,
    });
};

export const activationUser = async (email: string, token: string, userType: string, userName: string) => {
    let body = `<div style="font-size: 22px; font-weight: 600; color: #1E293B;">Hi ${userName},</div>
  <div style="font-size: 16px; font-weight: 400; color: #1E293BDE;">Thank you for creating your JobJenius account. Click the link below to activate your account.</div>
  <div style="height: 37px;margin: 32px 0 30px 0;">
    <a href="${process.env.PUBLIC_URL}/profile-activation?user=${userType}&token=${token}" target="_blank" style="text-decoration:none;color:#1E293B;font-size:18px;font-weight:600;padding:14px 50px;background-color: #57CED2;border: none;border-radius: 8px;font-family: Montserrat, sans-serif;cursor: pointer;">Activate your account</a>
  </div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "Activate your account",
        body,
    });
};

export const resetPassword = async (
    email: string,
    userName: string,
    uniqueId: string,
    userType: "employer" | "job-seeker"
) => {
    let body = `<div style="font-size: 22px; font-weight: 600; color: #1E293B;">Hi ${userName},</div>
  <div style="font-size: 16px; font-weight: 400; color: #1E293BDE;">You have recently requested to reset your JobJenius password.</div>
  <div style="font-size: 16px; font-weight: 400; color: #1E293BDE;">Click the link below to reset your password.</div>
  <div style="height: 37px;margin: 32px 0 30px 0;">
    <a href="${process.env.PUBLIC_URL}/password-reset-${userType}?key=${uniqueId}" target="_blank" style="text-decoration:none;color:#1E293B;font-size:18px;font-weight:600;padding:14px 50px;background-color: #57CED2;border: none;border-radius: 8px;font-family: Montserrat, sans-serif;cursor: pointer;">Reset your password</a>
  </div>
  <div style="font-size: 14px;font-weight: 400;">For your security, the link will expire in <b>20 minutes.</b> If your link has expired, you can always request a <a href="${process.env.PUBLIC_URL}/forgot-password${userType === "employer" ? "-employer" : ""}" target="_blank" style="text-decoration:none;color:#4860C4">new link</a>.</div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "Reset Password",
        body,
    });
};

export const contactUSEmail = async (data: ContactDTO) => {
    let body = `<div>Name:</div>
  <div style="margin-left: 20px;">${data.first_name} ${data.last_name}</div>
  <div>Email:</div>
  <div style="margin-left: 20px;">${data.email}</div>
  <div>Phone:</div>
  <div style="margin-left: 20px;">${data.phone_number}</div>
  <div>Message:</div>
  <div style="margin-left: 20px;">${data.message}</div>`;

    return await sendEmail({
        email: InfoEmail,
        source: AdminMail,
        subject: "Contact US - ",
        body,
    });
};

export const verificationCode = async (email: string, userName: string, code: string) => {
    let body = `<div style="font-size: 22px; font-weight: 600; color: #1E293B;">Hi ${userName},</div>
  <div style="font-size: 16px; font-weight: 400; color: #1E293B;">Your verification code is</div>
  <div style="width: 290px; border-radius: 8px; background-color: #F4F4F5;color:#64748B; font-size: 28px; font-weight: 700; margin-top: 20px; padding: 4px 0; text-align: center;">${code}</div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "Verification code",
        body,
    });
};

export const blockUser = async (email: string, userName: string) => {
    let body = `<div style="font-size: 22px; font-weight: 600; color: #1E293B;">Dear ${userName},</div>
  <div style="font-size: 16px; font-weight: 400; color: #1E293BDE;">You JobJenius account has been locked due to five unsuccessful login attempts. The account will remain locked unless you reset your password.</div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "account has been locked",
        body,
    });
};

export const chatHistory = async (email: string, startDate: Date, timeZone: number, chat: Message[]) => {
    let day = startDate.getDate();
    let month = startDate.getMonth();

    let history = "";

    for (let item of chat) {
        let date = new Date(item.createdAt.getTime() + timeZone * 60 * 1000);
        let hour = date.getHours();
        let minute = date.getMinutes();

        history += `<div style="display: flex; margin-bottom: 10px;">
      <div style="width: 215px; text-align: right; padding: 5px 10px; font-size: 14px; font-weight: 600; background-color: #${item.is_admin ? "64748B" : "EDEEF0"}; color: #${item.is_admin ? "FFFFFF" : "1E293B"};">${item.is_admin ? "JobJenius" : email}</div>
      <div style="width: 480px; margin-left: 10px; margin-right: 30px; font-size: 16px; font-weight: 400; color: #1E293B;">${item.message}</div>
      <div style="font-size: 14px; font-weight: 400; color: #64748B;">${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}</div>
    </div>`;
    }

    let body = `<div style="font-size: 28px; font-weight: 600; color: #1E293B; text-align: center;">Message history</div>
  <div style="width: 150px; border-radius: 8px; background-color: #F4F4F5;color:#64748B; font-size: 16px; font-weight: 500; margin: 20px auto; padding: 4px 0; text-align: center;">${day > 10 ? day : `0${day}`}/${month > 10 ? month : `0${month}`}/${startDate.getFullYear()}</div>
  <div>${history}</div>`;

    return await sendEmail({
        email,
        source: AdminMail,
        subject: "Chat history",
        body,
    });
};

const sendEmail = async (messageData: MessageData) => {
    try {
        const ses = new SESClient();
        const command = new SendEmailCommand({
            // SendEmailRequest
            Source: `Job Jenius <${messageData.source}>`, // required
            Destination: {
                // Destination
                ToAddresses: [
                    // AddressList
                    messageData.email,
                ],
            },
            Message: {
                // Message
                Subject: {
                    // Content
                    Charset: "utf-8",
                    Data: messageData.subject, // required
                },
                Body: {
                    // Body
                    Html: {
                        Charset: "utf-8",
                        Data: `
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
                </head>
                <body>
                  <div style="margin: 0; padding: 0;">
                    <div style="width: 100%; max-width: 700px; margin: auto; height: auto; background-color: white;">
                      <div style="width: max-content; margin: 20px auto 30px;">
                        <img src="${process.env.PUBLIC_URL}/logo.jpg" class="image" width="110" height="93" alt="logo">
                      </div>
                      <div>${messageData.body}</div>
                      <div style="background: #1E293B; margin-top: 30px; padding-top: 10px; padding-bottom: 20px;">
                        <div style="width: max-content; margin: 0 auto; padding: 20px 0; display: flex;">
                          <a href="${process.env.PUBLIC_URL}" target="_blank" style="text-decoration:none;color:#ffffff;font-size:14px">www.jobjenius.com</a>
                          <span style="color: #FFFFFF; font-size: 14px; font-weight: 400; margin: 0 10px;">|</span>
                          <a href="mailto:${InfoEmail}" target="_blank" style="text-decoration:none;color:#ffffff;font-size:14px">${InfoEmail}</a>
                          <span style="color: #FFFFFF; font-size: 14px; font-weight: 400; margin: 0 10px;">|</span>
                          <a href="tel:${TelNumber}" target="_blank" style="text-decoration:none;color:#ffffff;font-size:14px">${TelNumber}</a>
                        </div>
                        <div style="width: max-content; margin: 0 auto; display: flex; flex-wrap: wrap;">
                          <a href="https://www.facebook.com/people/JobJenius/61559284467330" target="_blank" style="margin: 0 10px;"><img src="${process.env.PUBLIC_URL}/facebook_icon.png" width="20" height="20" alt="social media facebook" /></a>
                          <a href="https://www.instagram.com/jobjenius/?igsh=MTE2d3h6eHk1ZmJqdQ%3D%3D&utm_source=qr" target="_blank" style="margin: 0 10px;"><img src="${process.env.PUBLIC_URL}/instagram_icon.png" width="20" height="20" alt="social media instagram" /></a>
                          <a href="https://www.linkedin.com/company/jobjenius" target="_blank" style="margin: 0 10px;"><img src="${process.env.PUBLIC_URL}/youtube_icon.png" width="20" height="20" alt="social media youtube" /></a>
                          <a href="https://www.youtube.com/channel/UCszzd22taRkx1AtN70BqOIA" target="_blank" style="margin: 0 10px;"><img src="${process.env.PUBLIC_URL}/linkedin_icon.png" width="20" height="20" alt="social media linkedin" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </body>
              </html>`,
                    },
                },
            },
        });

        let response = await ses.send(command);

        return response.MessageId ? { ok: true } : { ok: false, msg: "Failed to send email" };
    } catch (error) {
        console.log("ERROR", error);
        return { ok: false, msg: "Failed to send email" };
    }
};
