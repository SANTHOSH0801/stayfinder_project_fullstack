const UserController = require('./userController');
const ListingController = require('./listingController');
const BookingController = require('./bookingController');

module.exports = {
    ...UserController,
    ...ListingController,
    ...BookingController,
    getListingById: ListingController.getListingById
};
