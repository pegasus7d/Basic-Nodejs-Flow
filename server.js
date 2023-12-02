const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendEmail } = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://aryangargiitkgp:aryandatabase@cluster0.cajrxc6.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

var cors = require("cors");
app.use(cors());

// Define MongoDB Schema
const formDataSchema = new mongoose.Schema({
    // Fields for Form A
    nameA: String,
    ageA: Number,
    mobileA: String,
    actorA: String,
    emailA: String,

    // Fields for Form B
    nameB: String,
    ageB: Number,
    mobileB: String,
    actressB: String,
    emailB: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {
    try {
        console.log(req.body);
        const formData = req.body;
        const newFormData = new FormData(formData);
        await newFormData.save();
        sendEmail(formData);
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
