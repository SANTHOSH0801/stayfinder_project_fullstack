const mongoose = require('mongoose');
const connectDB = require('./db');
const { Listing } = require('../models/index');

const seedListings = [
    { "title": "Budget Hotel", "description": "Affordable stay in the city center.", "price": 1000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Heritage Home", "description": "Traditional home with local cuisine.", "price": 2000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Luxury Apartment", "description": "Upscale apartment with city views.", "price": 7000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Cozy Guest House", "description": "Comfortable guest house with local charm.", "price": 1500, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Economy Lodge", "description": "Basic amenities at a budget price.", "price": 800, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Business Hotel", "description": "Ideal for business travelers.", "price": 3000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Charming Cottage", "description": "Cottage with a garden.", "price": 2500, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Luxury Suite", "description": "Elegant suite with modern amenities.", "price": 12000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Backpacker Hostel", "description": "Budget-friendly hostel for travelers.", "price": 600, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Eco Lodge", "description": "Sustainable stay with organic meals.", "price": 3000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Guest House", "description": "Comfortable stay with local charm.", "price": 1200, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Resort Stay", "description": "Relaxing resort with pool access.", "price": 5000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Modern Hotel", "description": "Contemporary hotel with great service.", "price": 4000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Charming Bungalow", "description": "Bungalow with a homely feel.", "price": 3000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Luxury Villa", "description": "Private villa with luxury amenities.", "price": 15000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Simple Lodge", "description": "Basic lodge for short stays.", "price": 600, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Heritage Hotel", "description": "Hotel with rich history and culture.", "price": 6000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Comfort Inn", "description": "Comfortable stay with breakfast included.", "price": 2000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Family Resort", "description": "Family-friendly resort with activities.", "price": 8000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Hostel Stay", "description": "Affordable hostel with shared facilities.", "price": 400, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" },
    { "title": "Luxury Hotel", "description": "5-star hotel with premium services.", "price": 20000, "location": "Hyderabad", "owner": "6855816cd1b7e9cb7430e254" }
]







const seedDB = async () => {
    try {
        await connectDB();
        // await Listing.deleteMany({"location": "Hyderabad"});
        // console.log('Existing listings removed');
        await Listing.insertMany(seedListings);
        console.log('Sample hotel listings inserted');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDB();
