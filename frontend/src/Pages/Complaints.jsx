import React, { useState } from 'react';
import './CSS/Complaints.css';

const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const complaintData = { message: complaint };


    try {
      const response = await fetch("http://localhost:4000/addcomplaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      });

      if (response.ok) {
        setSubmitted(true);
        alert("Pengaduan berhasil dikirim ke email admin!");
      } else {
        alert("Gagal mengirim pengaduan.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="complaints-container">
      <h1>Customer Complaint</h1>
      <p>Please share your complaints or feedback with us!</p>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>Complaint:</label>
          <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} required></textarea>

          <button type="submit">Submit Complaint</button>
        </form>
      ) : (
        <div className="submission-message">
          <h2>Thank you for your complaint!</h2>
          <p><strong>Complaint:</strong> {complaint}</p>
        </div>
      )}
    </div>
  );
};

export default Complaints;
