import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Card.css';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../utils/Constant';

function Card({ id, image, title, price, rating }) {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(AppRoutes.ListingDetailPage(`${id}`));
    };

    return (
        <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <img src={image} alt={title} className="card-image" />
            
            <div className="badge"></div>
            <button className="like-btn">🤍</button>
            <div className="card-info">
                <h4>{title}</h4>
                <p>{price}</p>
                <p>• ⭐ {rating}</p>
            </div>
        </div>
    );
};

export default Card;
