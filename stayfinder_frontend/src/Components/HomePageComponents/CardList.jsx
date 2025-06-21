import React, { useEffect, useState, useRef } from 'react';
import Card from './Card.jsx';
import './CardList.css';
import image1 from '../../assets/HomeImages/image1.avif'
import image2 from '../../assets/HomeImages/image2.avif'
import image3 from '../../assets/HomeImages/image3.avif'
import image4 from '../../assets/HomeImages/image4.avif'
import image5 from '../../assets/HomeImages/image5.avif'
import image6 from '../../assets/HomeImages/image6.avif'
import image7 from '../../assets/HomeImages/image7.avif'
import image8 from '../../assets/HomeImages/image8.avif'


const images = [image1, image2 ,image3,image4,image5,image6,image7,image8]

const SCROLL_AMOUNT = 300;

const CardList = () => {
    const [listings, setListings] = useState({});
    const rowRefs = useRef({});

    useEffect(() => {
        // Fetch listings from backend
        fetch('https://stayfinderbackend-production.up.railway.app/api/listings')
            .then(res => res.json())
            .then(data => {
                // Group listings by location or any other criteria
                const grouped = data.reduce((acc, listing) => {
                    const key = listing.location || 'Other';
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(listing);
                    return acc;
                }, {});
                setListings(grouped);
            })
            .catch(err => console.error('Error fetching listings:', err));
    }, []);

    const scrollRow = (rowKey, direction) => {
        const row = rowRefs.current[rowKey];
        if (row) {
            row.scrollBy({ left: direction * SCROLL_AMOUNT, behavior: 'smooth' });
        }
    };

    
    return (
        <div className='card-section'>
            {Object.entries(listings).map(([selectTitle, cards]) => (
                <div key={selectTitle}>
                    <div className="row-header">
                        <h2 className="section-title"> {selectTitle}</h2>
                        <div className="scroll-buttons">
                            <button onClick={() => scrollRow(selectTitle, -1)}>{'<'}</button>
                            <button onClick={() => scrollRow(selectTitle, 1)}>{'>'}</button>
                        </div>
                    </div>
                    <div className="card-row"
                        ref={el => (rowRefs.current[selectTitle] = el)}
                    >
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                id={card._id}
                                image= {images[index % images.length]}
                                title={card.title}
                                price={`₹${card.price} per night`}
                                rating={card.rating || 4.5}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;
