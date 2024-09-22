const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log(process.env.PORT);

// POST Route for /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const flag = req.headers.flag === 'true';  // Check if flag is true
    let numbers = [];
    let alphabets = [];
    let highestLowercase = '';

    // Validate input and parse data array
    if (data && Array.isArray(data)) {
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/[a-zA-Z]/.test(item)) {
                alphabets.push(item);
                if (/[a-z]/.test(item)) {
                    if (item > highestLowercase) highestLowercase = item;
                }
            }
        });
    }

    // Use the flag if present, else default values
    const name = flag ? "Raghav Davesar" : "Nalini Patidar";
    const email = flag ? "rd3853@srmist.edu.in" : "np2800@srmist.edu.in";
    const roll = flag ? "RA2111004010387" : "RA2111004010421";

    // Initialize file validation variables
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKB = 0;

    // Check if file_b64 exists and process it
    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            fileValid = true;
            fileMimeType = mime.lookup(fileBuffer);
            fileSizeKB = (fileBuffer.length / 1024).toFixed(2); // Convert file size to KB
        } catch (err) {
            fileValid = false;  // If file processing fails, mark as invalid
        }
    }

    // Send response even if file_b64 is missing
    res.json({
        is_success: true,
        user_id: name,
        email: email,
        roll_number: roll,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercase],
        file_valid: file_b64 ? fileValid : false,  // Only validate file if present
        file_mime_type: fileMimeType || '',        // Default to empty string if no file
        file_size_kb: fileSizeKB || 0              // Default to 0 if no file
    });
});

// GET Route for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
