import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { ContactDTO } from "src/contact/dto/contact.dto";

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

export const productOrderEmail = async (data: any) => {
    let body = `<div>Name:</div>
  <div style="margin-left: 20px;">${data.full_name}</div>`;

    return await sendEmail({
        email: InfoEmail,
        source: AdminMail,
        subject: "Products Order - ",
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
        return { ok: false, msg: "Failed to send email" };
    }
};
