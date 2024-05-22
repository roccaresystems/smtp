const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.netcorecloud.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'richvvoync',
            pass: 'JjkE3#$N9',
        },
        connectionTimeout: 10000, // 10 seconds
        logger: true,
        debug: true, // include SMTP traffic in the logs
    });

    let mailOptions = {
        from: 'no-reply@roccaresystems.co.uk',
        to,
        subject,
        text,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
