import React, { useContext, useState, useEffect } from 'react';
import Card from '../../Components/HomePageComponents/Card.jsx';
import { LocationContext } from '../../Contexts/LocationContext.jsx';
import { PriceRangeContext } from '../../Contexts/PriceRangeContext.jsx';
import image1 from '../../assets/Images/image1.png';
import image2 from '../../assets/Images/image2.png';
import image3 from '../../assets/Images/image3.png';
import image4 from '../../assets/Images/image4.png';
import image5 from '../../assets/Images/image6.png';

import './ListingGridview.css';

const ListingGridview = () => {
    const { location } = useContext(LocationContext);
    const { priceRange } = useContext(PriceRangeContext);
    const [filteredListings, setfilteredListings] = useState([]);

    useEffect(() => {
        // Fetch listings from backend
        fetch('https://stayfinderbackend-production.up.railway.app/api/listings')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(listing => {
                    const locationMatch = listing.location.toLowerCase() === location.toLowerCase();
                    let priceMatch = true;
                    if (priceRange && Array.isArray(priceRange) && priceRange.length === 2) {
                        const [minPrice, maxPrice] = priceRange;
                        priceMatch = listing.price >= minPrice && listing.price <= maxPrice;
                    }
                    return locationMatch && priceMatch;
                });
                setfilteredListings(filtered);
            })
            .catch(err => console.error('Error fetching listings:', err));
    }, [location, priceRange]);

    const images = [image1, image2, image3, image4, image5];
    const formattedLocation = location.toUpperCase();

    return (
        <>
            {filteredListings.length > 0 ? (
                <>
                    <div className='no-listings-message'>
                        OVER 1000 PLACES IN {formattedLocation} LOCATION
                    </div>
                    <div className="listing-grid">
                        {filteredListings.map((card, index) => (
                            <Card
                                key={index}
                                id={card._id}
                                image={images[index % images.length]}
                                title={card.title}
                                price={`₹${card.price} per night`}
                                rating={card.rating || 4.5}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="no-stay-heading">
                    There are no stays in this {location} location.
                </div>
            )}
        </>
    );
};

export default ListingGridview;
