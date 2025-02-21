import React from 'react';
import "./CSS/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Email: <a href="mailto:support@shopmart.com">support@shopmart.com</a></p>
      <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
    </div>
  );
};

export default Contact;
