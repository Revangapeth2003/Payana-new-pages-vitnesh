import React, { useState } from 'react';
import './StipendProgram.css';

const StipendProgram = () => {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scholarshipTypes = [
    {
      icon: '🏆',
      title: 'Merit-Based Scholarships',
      description: 'Awarded for academic excellence, leadership qualities, and outstanding achievements',
      amount: 'Up to $50,000',
      percentage: '40%',
      color: '#3B82F6',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      icon: '💰',
      title: 'Need-Based Financial Aid',
      description: 'Financial assistance for students requiring monetary support for education',
      amount: 'Up to $30,000',
      percentage: '30%',
      color: '#10B981',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: '🌍',
      title: 'Country-Specific Grants',
      description: 'Regional scholarships targeting specific countries and cultural exchange',
      amount: 'Up to $25,000',
      percentage: '20%',
      color: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: '🎓',
      title: 'University Awards',
      description: 'Institutional scholarships directly from universities and colleges',
      amount: 'Up to $40,000',
      percentage: '35%',
      color: '#F59E0B',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const countries = {
    usa: {
      name: 'United States',
      flag: '🇺🇸',
      bgColor: '#FEE2E2',
      accentColor: '#DC2626',
      scholarships: [
        'Fulbright Program - Full funding for graduate study',
        'Merit-Based University Scholarships - $10,000-$50,000',
        'Gates Millennium Scholarship - Full tuition coverage'
      ],
      benefits: [
        'World-renowned research universities',
        'Diverse academic programs and majors',
        'Strong alumni networks globally',
        'Cutting-edge research opportunities'
      ],
      avgAmount: '$35,000',
      successRate: '78%',
      universities: '4,000+'
    },
    canada: {
      name: 'Canada',
      flag: '🇨🇦',
      bgColor: '#FEF3C7',
      accentColor: '#F59E0B',
      scholarships: [
        'Vanier Canada Graduate Scholarships - $50,000/year',
        'Canadian Commonwealth Scholarship - Full funding',
        'University-specific awards - $5,000-$25,000'
      ],
      benefits: [
        'Affordable tuition compared to US',
        'Multicultural and inclusive environment',
        'Post-graduation work opportunities',
        'High quality of life'
      ],
      avgAmount: '$25,000',
      successRate: '82%',
      universities: '200+'
    },
    uk: {
      name: 'United Kingdom',
      flag: '🇬🇧',
      bgColor: '#E0E7FF',
      accentColor: '#3B82F6',
      scholarships: [
        'Chevening Scholarships - Full funding + stipend',
        'Commonwealth Scholarships - Tuition + living costs',
        'Rhodes Scholarship at Oxford - Prestigious award'
      ],
      benefits: [
        'Historic universities with rich traditions',
        'Shorter degree programs (1-3 years)',
        'Gateway to European opportunities',
        'Strong research focus'
      ],
      avgAmount: '$40,000',
      successRate: '65%',
      universities: '150+'
    },
    australia: {
      name: 'Australia',
      flag: '🇦🇺',
      bgColor: '#ECFDF5',
      accentColor: '#10B981',
      scholarships: [
        'Australia Awards - Government scholarships',
        'Adelaide Scholarships International - Research funding',
        'University Merit Scholarships - $15,000-$30,000'
      ],
      benefits: [
        'High-quality education system',
        'Part-time work rights for students',
        'Beautiful multicultural campuses',
        'Strong research opportunities'
      ],
      avgAmount: '$28,000',
      successRate: '75%',
      universities: '43+'
    },
    germany: {
      name: 'Germany',
      flag: '🇩🇪',
      bgColor: '#F3E8FF',
      accentColor: '#8B5CF6',
      scholarships: [
        'DAAD Scholarships - Multiple programs available',
        'Heinrich Böll Foundation - Social scholarships',
        'Erasmus+ Programs - EU exchange funding'
      ],
      benefits: [
        'Low or no tuition fees at public universities',
        'Strong engineering and science programs',
        'Gateway to European job market',
        'Rich cultural and historical experience'
      ],
      avgAmount: '$18,000',
      successRate: '88%',
      universities: '400+'
    }
  };

  const successTips = [
    {
      phase: 'Research',
      icon: '🔍',
      title: 'Start Your Research Early',
      description: 'Begin 12-18 months before your intended start date',
      tips: ['Use scholarship databases', 'Contact university admissions', 'Join student forums'],
      timeframe: '12-18 months before',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      phase: 'Prepare',
      icon: '📚',
      title: 'Build Strong Applications',
      description: 'Focus on academic excellence and extracurriculars',
      tips: ['Maintain high GPA', 'Engage in leadership activities', 'Volunteer in community'],
      timeframe: '6-12 months before',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      phase: 'Apply',
      icon: '📝',
      title: 'Submit Quality Applications',
      description: 'Craft compelling essays and gather strong references',
      tips: ['Write personal statements', 'Get recommendation letters', 'Meet all deadlines'],
      timeframe: '3-6 months before',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      phase: 'Interview',
      icon: '🎯',
      title: 'Ace Your Interviews',
      description: 'Prepare thoroughly for scholarship interviews',
      tips: ['Practice common questions', 'Research the organization', 'Show your passion'],
      timeframe: '1-3 months before',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="stipend-program">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-description">
              Unlock world-class education opportunities with comprehensive scholarship guidance. 
              Access exclusive funding, expert mentorship, and personalized support to make your 
              international education dreams a reality.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Available Scholarships</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Partner Countries</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">85%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
            <div className="hero-actions">
              <button className="hero-btn primary" onClick={() => setIsFormOpen(true)}>
                <span>Explore Scholarships</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-container">
              <div className="visual-background"></div>
              <div className="hero-cards">
                <div className="floating-card card-1">
                  <div className="card-icon">🏆</div>
                  <div className="card-content">
                    <h4>Merit Awards</h4>
                    <p>$50,000+ Available</p>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">🌍</div>
                  <div className="card-content">
                    <h4>Global Programs</h4>
                    <p>50+ Countries</p>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">🎯</div>
                  <div className="card-content">
                    <h4>Success Rate</h4>
                    <p>85% Placement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Types Section */}
      <section className="section scholarship-types-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Scholarship Categories</h2>
            <p className="section-subtitle">
              Discover various funding opportunities designed to support your educational journey
            </p>
          </div>
          <div className="scholarship-grid">
            {scholarshipTypes.map((type, index) => (
              <div key={index} className="scholarship-card">
                <div className="card-image">
                  <img src={type.image} alt={type.title} />
                  <div className="card-percentage" style={{backgroundColor: type.color}}>
                    {type.percentage}
                  </div>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <div className="card-icon" style={{backgroundColor: `${type.color}20`, color: type.color}}>
                      {type.icon}
                    </div>
                  </div>
                  <h3 className="card-title">{type.title}</h3>
                  <p className="card-description">{type.description}</p>
                  <div className="card-bottom">
                    <div className="card-amount">{type.amount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="section countries-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Study Destinations</h2>
            <p className="section-subtitle">
              Explore scholarship opportunities in top study abroad destinations
            </p>
          </div>
          <div className="countries-grid">
            <div className="country-card">
              <div className="country-image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="United States" />
                <div className="country-flag">🇺🇸</div>
              </div>
              <div className="country-content">
                <div className="country-header">
                  <div className="country-icon">🏛️</div>
                </div>
                <h3 className="country-title">United States</h3>
                <p className="country-description">World-renowned universities with cutting-edge research opportunities</p>
                <ul className="country-list">
                  <li>Harvard, MIT, Stanford universities</li>
                  <li>$35,000 average scholarship</li>
                  <li>4,000+ partner institutions</li>
                </ul>
                <button className="country-apply-btn" onClick={() => setIsFormOpen(true)}>Apply Now</button>
              </div>
            </div>

            <div className="country-card">
              <div className="country-image">
                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Canada" />
                <div className="country-flag">🇨🇦</div>
              </div>
              <div className="country-content">
                <div className="country-header">
                  <div className="country-icon">🍁</div>
                </div>
                <h3 className="country-title">Canada</h3>
                <p className="country-description">Affordable education in a multicultural and inclusive environment</p>
                <ul className="country-list">
                  <li>UBC, McGill, University of Toronto</li>
                  <li>$25,000 average scholarship</li>
                  <li>Post-graduation work opportunities</li>
                </ul>
                <button className="country-apply-btn" onClick={() => setIsFormOpen(true)}>Apply Now</button>
              </div>
            </div>

            <div className="country-card">
              <div className="country-image">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="United Kingdom" />
                <div className="country-flag">🇬🇧</div>
              </div>
              <div className="country-content">
                <div className="country-header">
                  <div className="country-icon">👑</div>
                </div>
                <h3 className="country-title">United Kingdom</h3>
                <p className="country-description">Historic universities with rich academic traditions and shorter programs</p>
                <ul className="country-list">
                  <li>Oxford, Cambridge, Imperial College</li>
                  <li>$40,000 average scholarship</li>
                  <li>Gateway to European opportunities</li>
                </ul>
                <button className="country-apply-btn" onClick={() => setIsFormOpen(true)}>Apply Now</button>
              </div>
            </div>

            <div className="country-card">
              <div className="country-image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Australia" />
                <div className="country-flag">🇦🇺</div>
              </div>
              <div className="country-content">
                <div className="country-header">
                  <div className="country-icon">🦘</div>
                </div>
                <h3 className="country-title">Australia</h3>
                <p className="country-description">High-quality education with work rights and beautiful campuses</p>
                <ul className="country-list">
                  <li>University of Melbourne, ANU, UNSW</li>
                  <li>$28,000 average scholarship</li>
                  <li>Part-time work opportunities</li>
                </ul>
                <button className="country-apply-btn" onClick={() => setIsFormOpen(true)}>Apply Now</button>
              </div>
            </div>

            <div className="country-card">
              <div className="country-image">
                <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Germany" />
                <div className="country-flag">🇩🇪</div>
              </div>
              <div className="country-content">
                <div className="country-header">
                  <div className="country-icon">🏰</div>
                </div>
                <h3 className="country-title">Germany</h3>
                <p className="country-description">Low tuition fees with strong engineering and science programs</p>
                <ul className="country-list">
                  <li>TU Munich, Heidelberg, Humboldt</li>
                  <li>$18,000 average scholarship</li>
                  <li>Gateway to European job market</li>
                </ul>
                <button className="country-apply-btn" onClick={() => setIsFormOpen(true)}>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Tips Section */}
      <section className="section tips-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Path to Success</h2>
            <p className="section-subtitle">
              Strategic roadmap to maximize your scholarship application success
            </p>
          </div>
          <div className="tips-grid">
            {successTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-image">
                  <img src={tip.image} alt={tip.title} />
                  <div className="tip-phase">{tip.phase}</div>
                </div>
                <div className="tip-content">
                  <div className="tip-header">
                    <div className="tip-icon">{tip.icon}</div>
                  </div>
                  <h3 className="tip-title">{tip.title}</h3>
                  <p className="tip-description">{tip.description}</p>
                  <ul className="tip-list">
                    {tip.tips.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <div className="tip-timeframe">{tip.timeframe}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">Ready to Begin Your Journey?</h2>
              <p className="cta-description">
                Join thousands of successful students who transformed their futures with international education. 
                Get personalized guidance, exclusive scholarship access, and expert support every step of the way.
              </p>
            </div>
            <div className="cta-actions">
              <button className="cta-btn primary" onClick={() => setIsFormOpen(true)}>
                Start Your Application
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              {/* <button className="cta-btn secondary">
                Schedule Consultation
              </button> */}
            </div>
            <div className="cta-features">
              <div className="feature">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M20 6L9 17l-5-5"/>
                </svg>
                Free Initial Consultation
              </div>
              <div className="feature">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M20 6L9 17l-5-5"/>
                </svg>
                Personalized Scholarship Matching
              </div>
              <div className="feature">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M20 6L9 17l-5-5"/>
                </svg>
                Expert Application Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Form Modal */}
      {isFormOpen && <ScholarshipForm onClose={() => setIsFormOpen(false)} />}

    </div>
  );
};

// Scholarship Form Component
const ScholarshipForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    dateOfBirth: '',
    education: '',
    fieldOfStudy: '',
    preferredCountry: '',
    scholarshipType: '',
    englishProficiency: '',
    workExperience: '',
    financialNeed: '',
    academicAchievements: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/submit-stipend-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We will contact you soon.'
        });
        
        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scholarship-form-overlay">
      <div className="scholarship-form-container">
        <div className="form-header">
          <h2>🎓 Scholarship Application</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="scholarship-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="form-section">
            <h3>Academic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Education Level</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                >
                  <option value="">Select Education Level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Country *</label>
                <select
                  name="preferredCountry"
                  value={formData.preferredCountry}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Preferred Country</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                </select>
              </div>
              <div className="form-group">
                <label>Scholarship Type</label>
                <select
                  name="scholarshipType"
                  value={formData.scholarshipType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Scholarship Type</option>
                  <option value="merit">Merit-Based</option>
                  <option value="need">Need-Based</option>
                  <option value="country">Country-Specific</option>
                  <option value="university">University Award</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>English Proficiency</label>
                <select
                  name="englishProficiency"
                  value={formData.englishProficiency}
                  onChange={handleInputChange}
                >
                  <option value="">Select Proficiency Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="native">Native</option>
                  <option value="ielts">IELTS Certified</option>
                  <option value="toefl">TOEFL Certified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group full-width">
              <label>Work Experience</label>
              <textarea
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your work experience..."
              />
            </div>
            
            <div className="form-group full-width">
              <label>Financial Need</label>
              <textarea
                name="financialNeed"
                value={formData.financialNeed}
                onChange={handleInputChange}
                rows={3}
                placeholder="Explain your financial situation and need for scholarship..."
              />
            </div>
            
            <div className="form-group full-width">
              <label>Academic Achievements</label>
              <textarea
                name="academicAchievements"
                value={formData.academicAchievements}
                onChange={handleInputChange}
                rows={3}
                placeholder="List your academic achievements, awards, honors..."
              />
            </div>
            
            <div className="form-group full-width">
              <label>Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any additional information you'd like to share..."
              />
            </div>
          </div>

          {submitStatus && (
            <div className={`submit-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StipendProgram;
