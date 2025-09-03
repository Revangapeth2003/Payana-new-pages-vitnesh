import React, { useState } from 'react'
import "./Visa.css"

const Visa = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    visaType: '',
    message: ''
  });

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the dedicated visa application endpoint
      const response = await fetch('/api/visa-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            destination: formData.destination,
            visaType: formData.visaType,
            message: formData.message || 'No additional message provided',
            formType: 'Visa Application',
            submissionDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          }
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('🎉 Thank you! Your visa application has been submitted successfully. We will contact you soon.');
        closePopup();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          destination: '',
          visaType: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Sorry, there was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="visa-container">
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <div className='hero-text'>
            <span className="tagline">YOUR PATH TO NEW BEGINNINGS</span>
            <h1 className="hero-heading">Visas Done Right.<br />The First Time.<br />Every Time.</h1>
            <p className="hero-description">Trusted by millions, Payana ensures a smooth, accurate, and end-to-end visa process for every journey.</p>
            <button className="cta-button" onClick={openPopup}>
              <span>Apply Now</span>
              <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div className='hero-image-container'>
            <img src="/visa/visa-women.png" alt="Professional consultation" className="hero-image" />
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="section-header">
          <span className='section-tag'>WHY CHOOSE US</span>
          <h2 className="section-title">Your Complete Visa Solution for Top Destinations</h2>
          <p className="section-description">From expert consultation and application assistance to interview prep and ongoing support, Payana ensures a smooth and stress-free visa journey.</p>
        </div>
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/visa/visa-horse.png" alt="proven strategies" />
            </div>
            <h3 className="feature-title">Proven Visa Strategies</h3>
            <p className="feature-description">Expert strategies for the world's toughest visa approvals with proven success rates.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/visa/visa-brain.png" alt="smart applications" />
            </div>
            <h3 className="feature-title">AI-Powered Applications</h3>
            <p className="feature-description">Smarter visa applications combining human expertise with AI accuracy for better results.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/visa/visa-workflow.png" alt="experienced workflow" />
            </div>
            <h3 className="feature-title">25+ Years Experience</h3>
            <p className="feature-description">Visa workflow backed by over 25 years of industry experience and expertise.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/visa/visa-guidance.png" alt="real-time guidance" />
            </div>
            <h3 className="feature-title">Real-Time Updates</h3>
            <p className="feature-description">Accurate guidance backed by real-time updates and current immigration policies.</p>
          </div>
        </div>
      </section>

      {/* Visa Destinations Section */}
      <section className="destinations-section">
        <div className="section-header">
          <span className="section-tag">GLOBAL DESTINATIONS</span>
          <h2 className="section-title">Specialized Visa Services for Top 5 Destinations</h2>
        </div>
        
        <div className="destinations-grid">
          <div className="destination-card canada">
            <img src="/visa/visa-canada-image.png" alt="Canada visa" className="destination-image" />
            <div className="destination-overlay">
              <div className="destination-content">
                <h3>Canada</h3>
                <p>Canada welcomes 1.1M immigrants by 2027—offering jobs, quality life, easy PR, and a warm, multicultural environment.</p>
                <button className="destination-btn" onClick={openPopup}>
                  Apply Now
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="destination-card australia">
            <img src="/visa/visa-australia-image.png" alt="Australia visa" className="destination-image" />
            <div className="destination-overlay">
              <div className="destination-content">
                <h3>Australia</h3>
                <p>Live, work, or study in Australia—vibrant cities, PR visa benefits, and a welcoming English-speaking culture.</p>
                <button className="destination-btn" onClick={openPopup}>
                  Apply Now
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="destination-card uk">
            <img src="/visa/visa-uk-image.png" alt="UK visa" className="destination-image" />
            <div className="destination-overlay">
              <div className="destination-content">
                <h3>United Kingdom</h3>
                <p>The UK offers top quality of life, global career prospects, and vibrant cities for those seeking excellence.</p>
                <button className="destination-btn" onClick={openPopup}>
                  Apply Now
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="destination-card usa">
            <img src="/visa/visa-usa-image.png" alt="USA visa" className="destination-image" />
            <div className="destination-overlay">
              <div className="destination-content">
                <h3>United States</h3>
                <p>The USA offers unmatched opportunity, world-class education, and exceptional quality of life.</p>
                <button className="destination-btn" onClick={openPopup}>
                  Apply Now
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="destination-card schengen">
            <img src="/visa/visa-schengen-image.png" alt="Schengen visa" className="destination-image" />
            <div className="destination-overlay">
              <div className="destination-content">
                <h3>Schengen</h3>
                <p>Explore 27 EU nations with seamless travel, rich culture, and exciting career opportunities across Europe.</p>
                <button className="destination-btn" onClick={openPopup}>
                  Apply Now
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-tag">VISA CATEGORIES</span>
          <h2 className="section-title">Find the Right Visa for Your Journey</h2>
        </div>
        
        <div className="categories-grid">
          <div className="category-card student">
            <div className="category-image">
              <img src="/visa/section-4-student.png" alt="Student Visa" />
            </div>
            <div className="category-content">
              <div className="category-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3>Student Visa</h3>
              <p>Begin your educational journey at top global institutions with a student visa designed for academic success.</p>
              <button className="category-btn" onClick={openPopup}>
                Explore Now
                <svg className="btn-arrow" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="category-card business">
            <div className="category-image">
              <img src="/visa/sec-4-bussiness.png" alt="Business Visa" />
            </div>
            <div className="category-content">
              <div className="category-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Business Visa</h3>
              <p>Expand your business globally with the right visa to connect, collaborate, and thrive in international markets.</p>
              <button className="category-btn" onClick={openPopup}>
                Explore Now
                <svg className="btn-arrow" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="category-card work">
            <div className="category-image">
              <img src="/visa/section-4-work.png" alt="Work Visa" />
            </div>
            <div className="category-content">
              <div className="category-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>Work Visa</h3>
              <p>Unlock new career opportunities abroad with expert guidance on obtaining your working visa for global success.</p>
              <button className="category-btn" onClick={openPopup}>
                Explore Now
                <svg className="btn-arrow" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="category-card tourist">
            <div className="category-image">
              <img src="/visa/section-4-tourist.png" alt="Tourist Visa" />
            </div>
            <div className="category-content">
              <div className="category-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
              </div>
              <h3>Tourist Visa</h3>
              <p>Discover the world with ease—get the right travel visa to explore your dream destinations hassle-free.</p>
              <button className="category-btn" onClick={openPopup}>
                Explore Now
                <svg className="btn-arrow" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-header">
          <span className="section-tag">OUR PROCESS</span>
          <h2 className="section-title">A Trusted Process, Refined Over Time</h2>
        </div>
        
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Initial Consultation</h3>
              <p>Discuss your visa requirements with our experts to create a personalized strategy for success.</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Document Preparation</h3>
              <p>Gather and organize all required documents with our comprehensive checklist and guidance.</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Application Submission</h3>
              <p>Submit your flawless application with all necessary documents, guided by our experienced team.</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Interview Preparation</h3>
              <p>Comprehensive interview coaching and mock sessions to ensure you're fully prepared for success.</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">05</div>
            <div className="step-content">
              <h3>Visa Approval</h3>
              <p>Get approved smoothly and start your international journey with complete confidence and support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Start Your Visa Journey</h2>
              <button className="close-btn" onClick={closePopup}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <form className="popup-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="destination">Preferred Destination *</label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select destination</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Schengen Europe">Schengen (Europe)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="visaType">Visa Type *</label>
                <select
                  id="visaType"
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select visa type</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Work Visa">Work Visa</option>
                  <option value="Business Visa">Business Visa</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Family Visa">Family Visa</option>
                  <option value="Investment Visa">Investment Visa</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your specific requirements or any questions you have..."
                  rows="4"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Submitting...' : 'Start My Application'}</span>
                {!isSubmitting && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Visa
