import React from 'react';
import "./CSS/Location.css";

const Location = () => {
  const locationUrl = "https://www.google.com/maps/place/123+Main+Street,City,Country";

  return (
    <div className="location-container">
      <h1>Our Location</h1>
      <p>Jl. Gatot Subroto No. 25, Kuningan Barat, Mampang Prapatan District,
      South Jakarta 12710, Indonesia.</p>
      <p>Visit us on <a href={locationUrl} target="_blank" rel="noopener noreferrer">Google Maps</a></p>
    </div>
  );
};

export default Location;
