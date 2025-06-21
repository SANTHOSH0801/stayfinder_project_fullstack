import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/HostEditListing.css';
import NavBar from '../Components/NavBar.jsx';

const HostEditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`https://stayfinderbackend-production.up.railway.app/api/listings/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch listing');
                }
                const data = await response.json();
                setListing(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    location: data.location,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.price || !formData.location) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const response = await fetch(`https://stayfinderbackend-production.up.railway.app/api/listings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    price: Number(formData.price),
                    location: formData.location,
                    // Note: photo is not sent to backend as per requirement
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update listing');
            }
            alert('Listing updated successfully');
            navigate('/HostDashboard');
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <div>Loading listing...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!listing) {
        return <div>Listing not found</div>;
    }

    return (
        <>
            <NavBar />
            <div className="host-dashboard">
                <h1>Edit Listing</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price per night:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} />
                    </div>
                    <div className="photo-upload">
                        <label htmlFor="photoInput">Upload Photo</label>
                        <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} />
                        {photoPreview && <img src={photoPreview} alt="Preview" className="photo-preview" />}
                    </div>
                    <button type="submit">Update Listing</button>
                </form>
            </div>
        </>
    );
};

export default HostEditListing;
