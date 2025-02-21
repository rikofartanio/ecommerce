
import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah pengiriman form

    // Validasi email dasar
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      setFeedbackMessage('Masukkan alamat email yang valid.');
      return;
    }
    

    // Jika email valid, tampilkan pesan sukses
    setFeedbackMessage('Terima kasih telah berlangganan!');
    setEmail(''); // Kosongkan input setelah berhasil
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers In Your Inbox</h1>
      <p>Subscribe to our newsletter and stay updated!</p>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your Email id'
          required
        />
        <button type='submit'>Subscribe</button>
      </form>
      {feedbackMessage && (
        <p style={{ color: feedbackMessage.includes('valid') ? 'green' : 'red' }}>
          {feedbackMessage}
        </p>
      )}
    </div>
  );
};

export default NewsLetter;

