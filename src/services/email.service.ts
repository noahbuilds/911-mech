import nodemailer from 'nodemailer';
import configuration from '../configs/configs';

class EmailService {
    private transport = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: configuration.USER_EMAIL,
            pass: configuration.EMAIL_PASSWORD,
        },
    });

    public sendEmail = async (
        to: string,
        subject: string,
        text: string,
        from: string
    ) => {
        const message = {
            from: from,
            to: to,
            subject: subject,
            text: text,
        };
        const result = await this.transport.sendMail(message);
        return result;
    };
}

export { EmailService };
