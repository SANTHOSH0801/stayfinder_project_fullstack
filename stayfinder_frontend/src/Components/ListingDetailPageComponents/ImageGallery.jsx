import React from "react";
import "./ImageGallery.css";
import image1 from '../../assets/Images/image1.png'
import image2 from '../../assets/Images/image2.png'
import image3 from '../../assets/Images/image3.png'
import image4 from '../../assets/Images/image4.png'
import image5 from '../../assets/Images/image6.png'
import image6 from '../../assets/Images/image7.png'

const ImageGrid = () => {
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
    ];

    return (
        <div className="image-grid">
            <div className="left">
                <img src={images[0]} alt="Main" className="main-img" />
            </div>
            <div className="right">
                {images.slice(1, 5).map((src, idx) => (
                    <img key={idx} src={src} alt={`Sub ${idx + 1}`} className="sub-img" />
                ))}
                <button className="show-all">••• Show all photos</button>
            </div>
        </div>
    );
};

export default ImageGrid;
