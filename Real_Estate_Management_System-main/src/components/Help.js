import React, { useState } from 'react';
import './Help.css'; // Custom styles for the Help component

export default function Help() {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Welcome to the Help Center! How can I assist you today?' },
        { type: 'bot', text: 'Here are some common questions you can ask:' },
    ]);

    const [query, setQuery] = useState('');

    const faqs = [
        'How do I update my profile?',
        'How can I filter properties?',
        'How do I contact the agent?',
        'How do I change my password?',
        'How do I log out?',
        'How do I reset my password?',
        'What are the payment methods?',
        'How do I view my transaction history?',
        'Can I cancel my booking?',
        'How do I contact customer support?',
    ];

    const faqResponses = {
        'How do I update my profile?': 'To update your profile, go to the Client Dashboard and click on the "Edit Profile" button.',
        'How can I filter properties?': 'You can filter properties using the toggle bar and price slider on the Client Dashboard.',
        'How do I contact the agent?': 'To contact an agent, click on the property and view the details. The agent’s contact info will be displayed.',
        'How do I change my password?': 'You can change your password in the profile section by entering your current password and the new one.',
        'How do I log out?': 'You can log out by clicking the "Logout" button at the top right of the Client Dashboard.',
        'How do I reset my password?': 'To reset your password, go to the login page and click on "Forgot Password." Follow the instructions sent to your email.',
        'What are the payment methods?': 'We accept various payment methods including credit cards, debit cards, and bank transfers. Check the payment options during checkout.',
        'How do I view my transaction history?': 'You can view your transaction history in the "Transaction History" section under your profile on the Client Dashboard.',
        'Can I cancel my booking?': 'Yes, you can cancel your booking by going to the "My Bookings" section and selecting the booking you want to cancel.',
        'How do I contact customer support?': 'To contact customer support, you can email us at support@example.com or use the live chat feature available on the Help Center page.',
    };

    const handleSendMessage = () => {
        if (query.trim() === '') return;

        const newMessages = [...messages, { type: 'user', text: query }];
        const botResponse = faqResponses[query] || 'Sorry, I do not have an answer for that. Please contact support.';
        newMessages.push({ type: 'bot', text: botResponse });

        setMessages(newMessages);
        setQuery('');
    };

    const handleFaqClick = (faq) => {
        const newMessages = [...messages, { type: 'user', text: faq }];
        const botResponse = faqResponses[faq];
        newMessages.push({ type: 'bot', text: botResponse });

        setMessages(newMessages);
    };

    return (
        <div className="help-container">
            <div className="faq-sidebar">
                <h3>FAQs</h3>
                <ul>
                    {faqs.map((faq, index) => (
                        <li key={index} onClick={() => handleFaqClick(faq)}>{faq}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-interface">
                <div className="chat-box">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.type}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type your query here..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}
