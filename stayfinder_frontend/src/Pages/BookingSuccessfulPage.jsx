// src/pages/BookingSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BookingSuccessfulPage.css';

const BookingSuccessfulPage = () => {
    const navigate = useNavigate();

    return (
        <div className="booking-success-container">
            <div className="booking-card">
                <h1 className="success-title">🎉 Booking Confirmed!</h1>
                <p className="success-message">
                    Your stay has been successfully reserved. Thank you for choosing StayFinder!
                </p>
                <button onClick={() => navigate('/')} className="home-btn">
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default BookingSuccessfulPage;
