import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HostDashboard.css';
import HostPageCard from '../Components/HostPageCard/HostPageCard.jsx'
import NavBar from '../Components/NavBar.jsx';

import image1 from '../assets/HomeImages/image1.avif'
import image2 from '../assets/HomeImages/image2.avif'
import image3 from '../assets/HomeImages/image3.avif'
import image4 from '../assets/HomeImages/image4.avif'
import image5 from '../assets/HomeImages/image5.avif'
import image6 from '../assets/HomeImages/image6.avif'
import image7 from '../assets/HomeImages/image7.avif'
import image8 from '../assets/HomeImages/image8.avif'


const images = [image1, image2, image3, image4, image5, image6, image7, image8]

const HostDashboard = () => {
  const [listings, setListings] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username'); // owner is username string

  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });

  useEffect(() => {
    if (userRole !== 'host') {
      setError('Access denied. You are not a host.');
      setLoading(false);
      return;
    }

    if (!username) {
      setError('Username not found. Please login again.');
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      try {
        const response = await fetch(`https://stayfinderbackend-production.up.railway.app/api/listings?owner=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [username, userRole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    if (!newListing.title || !newListing.description || !newListing.price || !newListing.location) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('https://stayfinderbackend-production.up.railway.app/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newListing, owner: username }),
      });
      if (!response.ok) {
        throw new Error('Failed to add listing');
      }
      const addedListing = await response.json();
      setListings((prev) => [...prev, addedListing]);
      setNewListing({ title: '', description: '', price: '', location: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }
    try {
      const response = await fetch(`https://stayfinderbackend-production.up.railway.app/api/listings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }
      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="host-dashboard">
        <h1>Your Listings</h1>
        {listings.length > 0 ? (
          <div className="listing-grid">
            {listings.map((card, index) => (
              <HostPageCard
                key={index}
                id={card._id}
                image={images[index % images.length]}
                title={card.title}
                price={`₹${card.price} per night`}
                rating={card.rating || 4.5}
                onEdit={() => navigate(`/host-edit-listing/${card._id}`)}
                onDelete={handleDeleteListing}
              />
            ))}
          </div>
        ) : (
          <div className="no-listings-message">
            You have no listings yet.
          </div>
        )}

        <h2>Add New Listing</h2>
        <form onSubmit={handleAddListing}>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={newListing.title} onChange={handleInputChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={newListing.description} onChange={handleInputChange} />
          </div>
          <div>
            <label>Price per night:</label>
            <input type="number" name="price" value={newListing.price} onChange={handleInputChange} />
          </div>
          <div>
            <label>Location:</label>
            <input type="text" name="location" value={newListing.location} onChange={handleInputChange} />
          </div>
          <button type="submit">Add Listing</button>
        </form>
      </div>
    </>
  );
};

export default HostDashboard;
