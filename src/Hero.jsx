import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './App.css'; // Custom styles if needed
import SearchBar from './SearchBar';

const HeroSection = () => {
    const imageUrl = "/image1.png"; // Hardcoded image URL

    return (
        <div className='text-group'>
        <div className="hero-container position-relative" style={{ height: '80vh' }}>
            {/* Image is responsive with Bootstrap's img-fluid */}
            <img src={imageUrl} alt="Hero" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
    
            {/* Text section with responsive classes */}
            <div className="position-absolute top-50 start-0 translate-middle-y p-3 text-white text-center text-md-start"> 
                {/* Responsive text alignment: center on small screens, left on medium and larger */}
                <h1 className="display-4 fw-bold">Welcome to RockStore</h1> 
                {/* fw-bold for a bold headline */}
                <p className="lead">Your one-stop shop for everything you need for your car.</p>
                <SearchBar />
            </div>
        </div>
    </div>
    
    );
};

export default HeroSection;
