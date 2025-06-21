const { Booking } = require('../models/index');

// Create a new booking
const createBooking = async (req, res) => {
    const { listing, user, startDate, endDate } = req.body;
    if (!listing || !user || !startDate || !endDate) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    try {
        const booking = new Booking({ listing, user, startDate, endDate });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('listing')
            .populate('user', 'username email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createBooking,
    getBookings,
};
