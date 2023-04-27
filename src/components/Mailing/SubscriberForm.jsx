
//future: use nodemailer to send emails from node.js server
import React, { useState } from 'react';

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    // Check if the email address is valid using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Send the email address to your server to handle the subscription
    console.log(email);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Subscribe</button>
    </form>
  );
}
