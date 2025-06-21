const { Listing } = require('../models/index');

// Create a new listing
const createListing = async (req, res) => {
    const { title, description, price, location, owner } = req.body;
    if (!title || !description || !price || !location || !owner) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    try {
        const listing = new Listing({ title, description, price, location, owner });
        await listing.save();
        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getListingById = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id).populate('owner', 'username email');
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all listings or filter by owner ID
const getListings = async (req, res) => {
    try {
        const filter = {};
        if (req.query.owner) {
            filter.owner = req.query.owner; // owner is now string username
        }
        const listings = await Listing.find(filter);
        res.json(listings);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a listing by ID
const updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location } = req.body;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        listing.title = title || listing.title;
        listing.description = description || listing.description;
        listing.price = price || listing.price;
        listing.location = location || listing.location;
        await listing.save();
        res.json(listing);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a listing by ID
const deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing,
};
