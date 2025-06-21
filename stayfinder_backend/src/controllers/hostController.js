const { Listing, Booking } = require('../models/index');

const getHostListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user._id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
};

const getHostBookings = async (req, res) => {
  try {
    // Find listings owned by host
    const listings = await Listing.find({ owner: req.user._id });
    const listingIds = listings.map(listing => listing._id);

    // Find bookings for those listings
    const bookings = await Booking.find({ listing: { $in: listingIds } }).populate('user').populate('listing');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

module.exports = {
  getHostListings,
  getHostBookings,
};
