import React from 'react'
import image from '../../assets/Images/download.jpg';

function ReviewsSection() {
    const reviews = [
        {
            name: "Prasputita",
            joined: "3 years on Airbnb",
            date: "1 week ago",
            text: "Had a wonderful stay with family in this cozy n well maintained property in the heart of North Goa...",
            avatar: { image }
        },
        {
            name: "Kavya",
            joined: "1 month on Airbnb",
            date: "1 week ago",
            text: "The house was really beautiful and pool was clean. The host is very helpful and approachable...",
            avatar: { image }
        },
        {
            name: "Omkar",
            joined: "3 years on Airbnb",
            date: "2 weeks ago",
            text: "It’s very beautiful apartment exactly matches to photos. Found place exactly like home...",
            avatar: { image }
        },
        {
            name: "Daksh",
            joined: "9 years on Airbnb",
            date: "May 2025",
            text: "Dipti's place is absolutely wonderful - a perfect stay in a quiet yet happening neighborhood...",
            avatar: { image }
        },
        {
            name: "Kavita",
            joined: "4 months on Airbnb",
            date: "April 2025",
            text: "#dipti0000 #goatranquil\nWe had a wonderful stay at this beautiful property in Goa!",
            avatar: { image }
        },
        {
            name: "Sumit",
            joined: "3 years on Airbnb",
            date: "1 week ago",
            text: "Great interior, clean room and pool. The best part is the host was super responsive and proactive.",
            avatar: { image }
        }
    ];

    return (
        <>
            <div className="review-container">
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-header">
                            {review.avatar ? (
                                <img src={image} alt={review.name} className="avatar" />
                            ) : (
                                <div className="avatar-placeholder">{review.name.charAt(0)}</div>
                            )}
                            <div className="reviewer-info">
                                <strong>{review.name}</strong>
                                <span>{review.joined}</span>
                            </div>
                        </div>
                        <div className="review-meta">★★★★★ · {review.date}</div>
                        <p className="review-text">{review.text}</p>
                    </div>
                ))}
            </div>

        </>
    )
} 

export default ReviewsSection