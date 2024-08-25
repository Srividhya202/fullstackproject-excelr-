// About.js
import React from 'react';
import './About.css'; // Import the CSS file

export default function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <h2>About Us</h2>
                <div className="about-content">
                    <section className="about-description">
                        <h3>Who We Are</h3>
                        <p>
                            Welcome to our Real Estate Management System, a pioneering platform designed to streamline and simplify the process of buying, selling, and managing properties. Our system is built to cater to the needs of property owners, agents, and clients, offering a seamless experience that integrates all aspects of real estate management under one roof.
                        </p>
                        <p>
                            We are a dedicated team of professionals with years of experience in the real estate industry. Our mission is to provide a comprehensive, user-friendly solution that meets the diverse needs of our clients. Whether you are looking to buy your dream home, sell a property, or manage your real estate portfolio, our platform provides the tools and resources to help you achieve your goals.
                        </p>
                    </section>

                    <section className="about-mission">
                        <h3>Our Mission</h3>
                        <p>
                            Our mission is to empower individuals and businesses by providing them with cutting-edge technology and personalized service that enhances their real estate experiences. We strive to innovate continuously, ensuring our platform remains at the forefront of the industry, and to maintain a commitment to transparency, integrity, and excellence.
                        </p>
                    </section>

                    <section className="about-services">
                        <h3>What We Offer</h3>
                        <ul>
                            <li>Advanced Property Management</li>
                            <li>Efficient Client and Agent Management</li>
                            <li>Secure and Seamless Transactions</li>
                            <li>Comprehensive Property Listings and Filters</li>
                            <li>Real-time Notifications and Updates</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
