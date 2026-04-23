require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateFormData = (data) => {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!data.email || !validateEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
};

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const validationErrors = validateFormData({ name, email, subject, message });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: validationErrors
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || 'joyironali923@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p><em>This message was sent from your portfolio contact form.</em></p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            errors: ['Failed to send message. Please try again later.']
        });
    }
});

app.get('/', (req, res) => {
    res.send('Contact API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
