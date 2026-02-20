// netlify/functions/getTours.js

const fetch = require('node-fetch'); // Netlify supports node-fetch by default

const BASE_URL = 'https://sandbox.raynatours.com';
const LIST_ENDPOINT = '/api/Tour/tourstaticdata';
const authToken = process.env.RAYNA_API_KEY; // we'll store key in environment

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const countryId = body.countryId || 13063;
        const cityId = body.cityId || 13668;

        const response = await fetch(`${BASE_URL}${LIST_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ countryId, cityId })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch tours' })
        };
    }
};
