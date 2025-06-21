import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./ListingLayout.css";
import image from '../../assets/Images/download.jpg';
import GuestSelector from '../SearchFilter/GuestsList/GuestSelector.jsx';

const ListingLayout = ({ listing }) => {
    const { id } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [days, setDays] = useState(1);
    const [guestCounts, setGuestCounts] = useState({ adults: 0, children: 0, infants: 0 });
    const [GuestSelect, setGuestSelect] = useState(false);
    const GuestRef = useRef(null);

    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        setIsLoggedIn(!!username);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (GuestRef.current && !GuestRef.current.contains(event.target)) {
                setGuestSelect(false);
            }
        }
        if (GuestSelect) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [GuestSelect]);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDays(diffDays > 0 ? diffDays : 1);
        }
    }, [startDate, endDate]);

    const getGuestSummary = () => {
        const { adults, children, infants } = guestCounts;
        const totalGuests = adults + children;
        const summary = [];

        if (totalGuests > 0) summary.push(`${totalGuests} guest${totalGuests > 1 ? 's' : ''}`);
        if (infants > 0) summary.push(`${infants} infant${infants > 1 ? 's' : ''}`);

        return summary.length > 0 ? summary.join(', ') : 'Select guests ▼';
    };

    const handleBooking = async () => {
        setError('');
        setSuccess('');

        if (!isLoggedIn) {
            setError('You must be logged in to book a stay.');
            return;
        }

        if (!startDate || !endDate) {
            setError('Please select start and end dates.');
            return;
        }

        try {
            const username = localStorage.getItem('username');
            const requestBody = { listing: id, user: username, startDate, endDate };
            const response = await fetch('https://stayfinderbackend-production.up.railway.app/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            // localStorage.removeItem('username');  // Removed to prevent logout after booking


            if (!response.ok) throw new Error('Booking failed at server');
            setSuccess('Booking successful!');
            setStartDate('');
            setEndDate('');
            navigate('/BookingSuccessfulPage');
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePayAndBook = async () => {
        setPaymentProcessing(true);
        setPaymentError('');
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // alert('Mock payment successful!');
            setPaymentProcessing(false);
            await handleBooking();
        } catch (err) {
            setPaymentProcessing(false);
            setPaymentError('Payment failed. Please try again.', err);
        }
    };

    return (
        <div className="listing-container">
            {/* Left Section */}
            <div className="listing-left">
                <h2 className="Location">Entire serviced apartment in {listing.location}, India</h2>
                <p className="script">3 guests · 1 bedroom · 2 beds · 1 bathroom</p>
                <div className="guest-badge">
                    <div className="guest-info">
                        <span>🌿 Guest favourite<br />One of the most loved homes on StayFinder</span>
                    </div>
                    <div className="rating-box">
                        <div className="rating-new1">
                            <div className="rating-top">
                                <strong className="rating">4.94</strong>
                            </div>
                            <div className="rating-bottom">
                                <span className="stars">★★★★</span>
                            </div>
                        </div>
                    </div>
                    <div className="rating-new2">
                        <div className="reviews">
                            <span>65</span>
                            <span>Reviews</span>
                        </div>
                    </div>
                </div>
                <div className="hr-l"></div>
                <div className="host-info">
                    <img src={image} alt="Host" className="host-avatar" />
                    <div className="name">
                        <p><strong>Hosted by Dipti</strong></p>
                        <p>Superhost · 7 years hosting</p>
                    </div>
                </div>
                <ul className="features">
                    <li>🏖️ 18-min walk to the beach</li>
                    <li>❄️ Designed for staying cool</li>
                    <li>🌴 Amazing outdoor space</li>
                </ul>
                <div className="hr-l"></div>
                <p className="description">
                    This is a luxurious apartment with a private plunge pool, Mediterranean look
                    which you will fall in love with. With a bedroom and en-suite bathroom,
                    it is just the right size for couples or a small family.
                </p>
                <div className="amenities-section">
                    <h3>What this place offers</h3>
                    <div className="amenities-grid">
                        <div>🍴 Kitchen</div>
                        <div>📶 Wifi</div>
                        <div>🧑‍💻 Dedicated workspace</div>
                        <div>🚗 Free parking on premises</div>
                        <div>🏊 Shared outdoor pool – available all year, open 24 hours, infinity, rooftop</div>
                        <div>🛁 Private hot tub – available all year, open 24 hours</div>
                        <div>📺 TV</div>
                        <div>🎥 Exterior security cameras on property</div>
                        <div className="disabled">🚫 <s>Carbon monoxide alarm</s></div>
                        <div className="disabled">🚫 <s>Smoke alarm</s></div>
                    </div>
                    <button className="show-amenities-btn">Show all 50 amenities</button>
                </div>

            </div>

            {/* Right Section */}
            <div className="listing-right sticky-box">
                <div className="promo-tag">🎯 Rare find! This place is usually booked</div>
                <div className="price-box">
                    <p className="price">₹{listing.price * days}</p>
                    <p className="note">for {days} {days === 1 ? 'day' : 'days'}</p>

                    <div className="date-box">
                        <div>
                            <label>CHECK-IN</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>
                        <div>
                            <label>CHECKOUT</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                    </div>

                    <div className="guest-select" ref={GuestRef}>
                        <label>GUESTS</label>
                        <div className="guest-input-box" onClick={() => setGuestSelect(!GuestSelect)}>
                            {getGuestSummary()}
                        </div>
                        {GuestSelect && (
                            <div className="guest-dropdown">
                                <GuestSelector onChange={(guests) => setGuestCounts(guests)} />
                            </div>
                        )}
                    </div>

                    <button
                        className="mock-pay-btn"
                        onClick={handlePayAndBook}
                        disabled={paymentProcessing || !isLoggedIn}
                    >
                        {paymentProcessing ? 'Processing Payment...' : `Pay & Book ₹${listing.price * days}`}
                    </button>

                    {!isLoggedIn && (
                        <p className="login-message">Please log in to book a stay.</p>
                    )}
                    {error && <p className="error-message">Error: {error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    {paymentError && <p className="error-message">{paymentError}</p>}
                </div>
            </div>
        </div>
    );
};

export default ListingLayout;
