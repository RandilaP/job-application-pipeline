// src/components/ApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './ApplicationForm.css';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cv: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Create form data for file upload
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('cv', formData.cv);
    
    try {
      // Submit to your API endpoint
      const response = await axios.post('https://your-api-gateway-url/submit', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        cv: null
      });
    } catch (err) {
      setError('There was an error submitting your application. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Job Application</h2>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cv">CV Upload (PDF or DOCX)</label>
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={handleFileChange}
              accept=".pdf,.docx"
              required
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Application Submitted!</h3>
          <p>Thank you for your application. We'll review your CV and get back to you soon.</p>
          <button onClick={() => setSuccess(false)}>Submit Another Application</button>
        </div>
      )}
    </div>
  );
}

export default ApplicationForm;