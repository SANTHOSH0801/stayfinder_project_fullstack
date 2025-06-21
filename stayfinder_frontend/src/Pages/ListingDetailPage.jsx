import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ListingDetailPage.css';
import NavBar from '../Components/NavBar.jsx';
import ImageGrid from '../Components/ListingDetailPageComponents/ImageGallery.jsx';
import ListingLayout from '../Components/ListingDetailPageComponents/ListingLayout.jsx'
import ReviewSection from '../Components/ListingDetailPageComponents/ReviewsSection.jsx';

const ListingDetailPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`https://stayfinderbackend-production.up.railway.app/api/listings/${id}`);
                if (!res.ok) throw new Error('Failed to fetch listing');
                const data = await res.json();
                setListing(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);



    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <>
            <NavBar />
            <div className="listing-detail-container">
                <h1 className="listing-title">{listing.title}</h1>
                <div className="image-gallery">
                    <ImageGrid />
                </div>
                <div>
                    <ListingLayout listing = {listing}/>
                </div>
                <div className="hr-l"></div>
                <div>
                    <ReviewSection/>
                </div>
            </div>

        </>
    );
};

export default ListingDetailPage;
