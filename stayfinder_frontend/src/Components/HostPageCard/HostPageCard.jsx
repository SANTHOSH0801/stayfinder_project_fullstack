/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HostPageCard.css';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../utils/Constant';

function HostPageCard({ id, image, title, price, rating, onEdit, onDelete }) {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()

    return (
        <div className="card2" style={{ cursor: 'pointer' }}>
                <img src={image} alt={title} className="card-image2" />
            <div className="badge"></div>
            <button className="like-btn">🤍</button>
            <div className="card-info2">
                <h4>{title}</h4>
                <p>{price}</p>
                <p>• ⭐ {rating}</p>
            </div>
            <div className="card-actions">
                <button className="edit-btn" onClick={() => onEdit(id)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
};

export default HostPageCard;
