// emailService.js
const nodemailer = require('nodemailer');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ea119208696@gmail.com',  // Replace with your Gmail address
        pass: 'qztz txio msmw cvkq'       
    }
});

// Function to send email
function sendEmail(formData) {
    const mailOptions = {
        from: 'your-email@gmail.com',  // Replace with your Gmail address
        to: formData.emailA || formData.emailB,
        subject: 'Form Submission',
        text: `Hello ${formData.nameA || formData.nameB},\n\nThank you for submitting the form. Your data has been received successfully.\n\nRegards,\nYour App`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail };
