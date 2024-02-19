const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json()); // For parsing application/json

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/emails', (req, res) => {
    const { to, subject, body } = req.body;

    let mailOptions = {
        from: 'helloiamfortest@gmail.com',
        to: to,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
