// Contact.js
import React from 'react';
import './Contact.css'; // Import the CSS file

export default function Contact() {
    return (
        <div className="contact-page">
            <h2>Contact Us</h2>
            <div className="contact-container">
                <div className="contact-form-section">
                    <h3>Get in Touch</h3>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send Message</button>
                    </form>
                </div>

                <div className="contact-info-section">
                    <h3>Contact Information</h3>
                    <p>Email: info@realestatemgmt.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Real Estate Avenue, City, State, ZIP</p>
                    <div className="social-media">
                        <h4>Follow Us</h4>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
