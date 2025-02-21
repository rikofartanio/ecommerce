import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Shopmart Logo" />
        <p>SHOPMART</p>
      </div>
      <ul className="footer-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/complaint">Complaint</Link></li>
        <li><Link to="/location">Location</Link></li>
      </ul>
      {/* Ikon media sosial dengan link */}
      <div className="footer-social-icon">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagram_icon} alt="Instagram" />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
          <img src={pinterest_icon} alt="Pinterest" />
        </a>
        <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
          <img src={whatsapp_icon} alt="WhatsApp" />
        </a>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>© 2025 Riko - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer

