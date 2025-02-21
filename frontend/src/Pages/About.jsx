import React from 'react';
import './CSS/About.css';

const About = () => {
  return (
    <div className="container">
      <h1 className="heading">About Us</h1>
      <p className="text">Welcome to SHOPMART, your go to destination for trendy and high quality fashion. We offer a wide range of stylish clothing for every occasion, ensuring you always look and feel your best.</p>

      <div className="section">
        <h2 className="subheading">Our Vision</h2>
        <p className="text">To become a leading fashion e-commerce platform that offers high-quality clothing with the latest styles, providing a seamless, convenient, and satisfying shopping experience for all customers.</p>
      </div>

      <div className="section">
        <h2 className="subheading">Our Mission</h2>
        <ul className="list">
          <li>Provide trendy and high-quality clothing at affordable prices.</li>
          <li>Deliver excellent service to ensure customer satisfaction.</li>
          <li>Stay updated with fashion trends to keep customers stylish.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
