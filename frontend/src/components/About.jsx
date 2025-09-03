/* src/components/About.jsx */
import React, { useState } from 'react';
import './About.css';

const About = () => {
  /* ---------- state ---------- */
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    company: '', service: '',
    budget: '', timeline: '',
    message: '', agreement: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------- helpers ---------- */
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const v = {};
    if (!formData.name.trim()) v.name = 'Required';
    if (!formData.email.trim()) v.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) v.email = 'Invalid email';
    if (!formData.phone.trim()) v.phone = 'Required';
    if (!formData.service) v.service = 'Select a service';
    if (!formData.message.trim()) v.message = 'Required';
    if (!formData.agreement) v.agreement = 'Please agree';
    return v;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });
      if (!res.ok) throw new Error('Server error');
      alert('Message sent – we will reply shortly.');
      setFormData({
        name: '', email: '', phone: '',
        company: '', service: '',
        budget: '', timeline: '',
        message: '', agreement: false
      });
    } catch (err) {
      alert('Failed to send. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="about-page">
      {/* ===== Hero ===== */}
      {/* ===== Hero ===== */}
{/* ===== Hero ===== */}
<section className="hero-section">
  <div className="container">
    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">
          Your Trusted Partner for <span className="title-accent">Global Immigration</span>
        </h1>
        
        <p className="hero-subtitle">
          Expert guidance for Study, Work, Business, and Family visas. We've helped over 2,000 families achieve their immigration dreams with our proven 98% success rate.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary">
            Free Consultation
          </button>
          {/* <button className="btn-secondary">
            View Success Stories
          </button> */}
        </div>
        
        <div className="hero-trust">
          <div className="trust-stats">
            <div className="stat">
              <span className="stat-number">2,000+</span>
              <span className="stat-text">Happy Families</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-text">Success Rate</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-text">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-image">
        <img 
          src="..\public\about\About-lady-with-suitcase.png" 
          alt="Professional Immigration Consultation" 
        />
      </div>
    </div>
  </div>
</section>



      {/* ===== Services ===== */}
      <Services />

      {/* ===== About ===== */}
      <AboutSection />

      {/* ===== Process ===== */}
      <Process />

      {/* ===== Contact ===== */}
      <Contact
        formData={formData}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const AboutSection = () => (
  <section className="about-section">
    <div className="container">
      <div className="about-content">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Professional team meeting" 
          />
        </div>
        <div className="about-text">
          <h2 className="section-title">About Payana Overseas</h2>
          <p className="section-subtitle">
            Leading immigration consultancy with a proven track record of success
          </p>
          
          <div className="about-description">
            <p>
              Established in 2008, Payana Overseas has been at the forefront of immigration services, 
              helping thousands of individuals and families achieve their dreams of studying, working, 
              and settling abroad.
            </p>
            <p>
              Our team of certified immigration consultants provides comprehensive guidance through 
              every step of your immigration journey, ensuring the highest success rates and 
              customer satisfaction.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-item">
              <h4>Expert Consultation</h4>
              <p>Personalized guidance from certified immigration experts</p>
            </div>
            <div className="feature-item">
              <h4>Document Preparation</h4>
              <p>Comprehensive assistance with all required documentation</p>
            </div>
            <div className="feature-item">
              <h4>Application Processing</h4>
              <p>End-to-end handling of your immigration applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="services-section">
    {/* Header still uses container */}
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Our Immigration Services</h2>
        <p className="section-subtitle">
          Comprehensive immigration solutions tailored to your specific needs
        </p>
      </div>
    </div>

    {/* Grid breaks out of container for full width */}
    <div className="services-grid-fullwidth">
      <div className="service-card">
        <div className="service-number">01</div>
        <div className="service-image">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Study Immigration" 
          />
        </div>
        <h3 className="service-title">Study Immigration</h3>
        <p className="service-description">
          Complete guidance for student visas, university admissions, and study abroad programs. 
          We help you secure admission to top universities worldwide.
        </p>
      </div>

      <div className="service-card">
        <div className="service-number">02</div>
        <div className="service-image">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Business Immigration" 
          />
        </div>
        <h3 className="service-title">Business Immigration</h3>
        <p className="service-description">
          Expert assistance for investor visas, startup visas, and business migration programs. 
          Expand your business globally with our proven strategies.
        </p>
      </div>

      <div className="service-card">
        <div className="service-number">03</div>
        <div className="service-image">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Work Immigration" 
          />
        </div>
        <h3 className="service-title">Work Immigration</h3>
        <p className="service-description">
          Professional support for work permits, skilled worker visas, and employment-based 
          immigration. Build your career in your dream destination.
        </p>
      </div>

      <div className="service-card">
        <div className="service-number">04</div>
        <div className="service-image">
          <img 
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Family Immigration" 
          />
        </div>
        <h3 className="service-title">Family Immigration</h3>
        <p className="service-description">
          Comprehensive family reunification services, spouse visas, and dependent visas. 
          Keep your family together while pursuing your immigration goals.
        </p>
      </div>

      <div className="service-card">
        <div className="service-number">05</div>
        <div className="service-image">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Permanent Residence" 
          />
        </div>
        <h3 className="service-title">Permanent Residence</h3>
        <p className="service-description">
          Expert guidance for permanent residency applications, citizenship pathways, and 
          long-term settlement solutions in your chosen destination.
        </p>
      </div>
    </div>
  </section>
);


const Process = () => (
  <section className="process-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Our Professional Process</h2>
        <p className="section-subtitle">
          A systematic approach ensuring the highest success rates
        </p>
      </div>

      <div className="process-grid">
        <div className="process-card">
          <div className="process-number">01</div>
          <div className="process-image">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Initial Consultation" 
            />
          </div>
          <h3 className="process-title">Initial Consultation</h3>
          <p className="process-description">
            Comprehensive assessment of your profile, goals, and eligibility for various immigration programs.
          </p>
        </div>

        <div className="process-card">
          <div className="process-number">02</div>
          <div className="process-image">
            <img 
              src="https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Strategy Development" 
            />
          </div>
          <h3 className="process-title">Strategy Development</h3>
          <p className="process-description">
            Customized immigration strategy and timeline development based on your specific requirements and goals.
          </p>
        </div>

        <div className="process-card">
          <div className="process-number">03</div>
          <div className="process-image">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Documentation" 
            />
          </div>
          <h3 className="process-title">Documentation & Preparation</h3>
          <p className="process-description">
            Complete assistance with document collection, verification, and preparation of your application package.
          </p>
        </div>

        <div className="process-card">
          <div className="process-number">04</div>
          <div className="process-image">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Application Success" 
            />
          </div>
          <h3 className="process-title">Application & Follow-up</h3>
          <p className="process-description">
            Professional submission and continuous monitoring of your application until successful approval.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Contact = ({ formData, errors, loading, handleChange, handleSubmit }) => (
  <section className="contact-section">
    <div className="container">
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-image">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Contact us" 
            />
          </div>
        </div>
        
        <div className="contact-form">
          <div className="section-header">
            <h2 className="section-title">Get Professional Consultation</h2>
            <p className="section-subtitle">
              Start your immigration journey with expert guidance
            </p>
          </div>

          <form className="consultation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <Input label="Full Name *" id="name" value={formData.name} error={errors.name} onChange={handleChange} />
              <Input label="Email Address *" id="email" type="email" value={formData.email} error={errors.email} onChange={handleChange} />
            </div>
            
            <div className="form-row">
              <Input label="Phone Number *" id="phone" type="tel" value={formData.phone} error={errors.phone} onChange={handleChange} />
              <Input label="Company/Organization" id="company" value={formData.company} onChange={handleChange} />
            </div>
            
            <div className="form-row">
              <Select 
                label="Service Interest *" 
                id="service" 
                value={formData.service} 
                error={errors.service} 
                onChange={handleChange}
                options={['', 'Study Immigration', 'Business Immigration', 'Work Immigration', 'Family Immigration', 'Permanent Residence']} 
              />
              <Select 
                label="Budget Range" 
                id="budget" 
                value={formData.budget} 
                onChange={handleChange}
                options={['', 'Under $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000 - $50,000', 'Over $50,000']} 
              />
            </div>
            
            <Select 
              label="Timeline" 
              id="timeline" 
              value={formData.timeline} 
              onChange={handleChange}
              options={['', 'Within 3 months', '3-6 months', '6-12 months', '1-2 years', 'Flexible']} 
            />
            
            <Textarea 
              label="Tell us about your requirements *" 
              id="message" 
              value={formData.message} 
              error={errors.message} 
              onChange={handleChange}
              placeholder="Please describe your immigration goals, preferred destination, and any specific requirements..." 
            />
            
            <div className="checkbox-group">
              <input type="checkbox" id="agreement" name="agreement" checked={formData.agreement} onChange={handleChange} />
              <label htmlFor="agreement">
                I agree to the Terms of Service and Privacy Policy, and consent to be contacted regarding my immigration consultation.
              </label>
            </div>
            {errors.agreement && <div className="checkbox-error">{errors.agreement}</div>}
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Get Free Consultation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Form Components ---------- */
const Input = ({ label, id, type = 'text', value, onChange, error }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type} 
      id={id} 
      name={id} 
      value={value} 
      onChange={onChange}
      className={error ? 'error' : ''}
      placeholder={`Enter your ${label.replace('*', '').trim().toLowerCase()}`}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

const Select = ({ label, id, value, onChange, options, error }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={id} value={value} onChange={onChange} className={error ? 'error' : ''}>
      {options.map(o => (
        <option key={o} value={o}>
          {o || 'Please select...'}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error}</span>}
  </div>
);

const Textarea = ({ label, id, value, onChange, error, ...rest }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <textarea 
      id={id} 
      name={id} 
      rows="4" 
      value={value} 
      onChange={onChange} 
      className={error ? 'error' : ''} 
      {...rest} 
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default About;
