import React, { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ full_name: '', email: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    // Basic Client validation
    if (!formData.full_name.trim() || !formData.email.trim()) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setStatus({ type: 'success', message: 'Person registered successfully!' });
      setFormData({ full_name: '', email: '' });
    } catch (err) {
      if (err.message === 'EMAIL_ALREADY_EXISTS') {
        setStatus({ type: 'error', message: 'This email is already registered.' });
      } else {
        setStatus({ type: 'error', message: err.message || 'An error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card form-container glass-effect">
      <h2>Register New Person</h2>
      {status.message && (
        <div className={`alert alert-${status.type}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            placeholder="John Doe"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="john@example.com"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Person'}
        </button>
      </form>
    </div>
  );
}
