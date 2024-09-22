const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
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

    // File validation (Base64 decoding)
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKB = 0;

    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            fileValid = true;
            fileMimeType = mime.lookup(fileBuffer);
            fileSizeKB = (fileBuffer.length / 1024).toFixed(2); // KB
        } catch (err) {
            fileValid = false;
        }
    }
    else{
      res.json({
        is_success: true,
        user_id: "john_doe_17091999",  // Hardcoded as per example
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercase],
        fileValid:false
    });
    }

    // Response
    res.json({
        is_success: true,
        user_id: "john_doe_17091999",  // Hardcoded as per example
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercase],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
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
