const axios = require('axios');
const DocumentRequest = require('../models/DocumentRequest');

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_API_URL = 'https://api.paymongo.com/v1';

// Helper to create PayMongo headers
const getHeaders = () => {
    const token = Buffer.from(PAYMONGO_SECRET_KEY + ':').toString('base64');
    return {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

exports.createPaymentLink = async (req, res) => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({ message: 'Request ID is required' });
        }

        const documentRequest = await DocumentRequest.findById(requestId).populate('applicant');

        if (!documentRequest) {
            return res.status(404).json({ message: 'Document request not found' });
        }

        if (documentRequest.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'This request is already paid' });
        }

        // Default fee if not set (example: 50 PHP)
        const amount = documentRequest.fees > 0 ? documentRequest.fees * 100 : 5000; // Amount in centavos (50.00 PHP)
        const description = `Payment for ${documentRequest.documentType} - Request #${documentRequest._id}`;

        const payload = {
            data: {
                attributes: {
                    amount: amount,
                    description: description,
                    remarks: `Document Request: ${documentRequest.documentType}`,
                }
            }
        };

        const response = await axios.post(`${PAYMONGO_API_URL}/links`, payload, {
            headers: getHeaders()
        });

        const paymentLink = response.data.data.attributes.checkout_url;
        const referenceNumber = response.data.data.id;

        // You might want to save the reference number to the document request
        // documentRequest.paymentReference = referenceNumber;
        // await documentRequest.save();

        res.status(200).json({
            success: true,
            paymentLink: paymentLink,
            referenceNumber: referenceNumber
        });

    } catch (error) {
        console.error('PayMongo Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            message: 'Failed to create payment link', 
            error: error.response ? error.response.data : error.message 
        });
    }
};

// Webhook handler (simplified)
// In a real app, you would verify the signature and update the database
exports.webhook = async (req, res) => {
    // Logic to handle webhook events from PayMongo
    // e.g., update documentRequest.paymentStatus = 'paid'
    console.log('Webhook received:', req.body);
    res.status(200).send('Webhook received');
};
