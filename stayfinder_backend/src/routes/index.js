const express = require('express');
const router = express.Router();

const controllers = require('../controllers/index');
const hostController = require('../controllers/hostController');
const { authMiddleware, hostOnly } = require('../middleware/authMiddleware');

// User routes
router.post('/register', controllers.registerUser);
router.post('/login', controllers.loginUser);

router.get('/profile', controllers.getUserProfile);

// Listing routes
router.post('/listings', controllers.createListing);
router.get('/listings', controllers.getListings);
router.get('/listings/:id', controllers.getListingById);
router.put('/listings/:id', controllers.updateListing);
router.delete('/listings/:id', controllers.deleteListing);

// Booking routes
router.post('/bookings', controllers.createBooking);
router.get('/bookings', controllers.getBookings);

// Host routes (protected)
router.get('/host/listings', authMiddleware, hostOnly, hostController.getHostListings);
router.get('/host/bookings', authMiddleware, hostOnly, hostController.getHostBookings);

module.exports = router;
