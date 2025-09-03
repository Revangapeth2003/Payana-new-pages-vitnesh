import React, { useState, useEffect } from 'react';
import './ArtsTech.css';

const ArtsTech = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const programFeatures = [
    {
      id: 1,
      icon: "🎨",
      title: "Digital Arts & Design",
      description: "Master cutting-edge digital design tools and creative software",
      details: "Explore advanced techniques in digital imaging, 3D modeling, animation, and interactive design. Learn industry-standard software including Adobe Creative Suite, Blender, Maya, and more.",
      skills: ["Digital Illustration", "3D Animation", "UI/UX Design", "Motion Graphics"],
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 2,
      icon: "🎬",
      title: "Media Production",
      description: "Create compelling multimedia content across various platforms",
      details: "Develop expertise in video production, audio engineering, and multimedia storytelling. Work with professional equipment and learn post-production techniques.",
      skills: ["Video Editing", "Sound Design", "Documentary Making", "Live Streaming"],
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 3,
      icon: "💻",
      title: "Interactive Technology",
      description: "Build immersive experiences using emerging technologies",
      details: "Combine art with technology through VR/AR development, interactive installations, and digital experiences. Learn programming for creative applications.",
      skills: ["VR/AR Development", "Interactive Installations", "Creative Coding", "Game Design"],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=250&fit=crop&auto=format"
    },
    {
      id: 4,
      icon: "🌐",
      title: "Digital Communication",
      description: "Master modern communication through digital mediums",
      details: "Learn to effectively communicate ideas through digital platforms, social media, and web technologies. Understand the intersection of technology and human communication.",
      skills: ["Social Media Strategy", "Web Development", "Digital Marketing", "Content Creation"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format"
    }
  ];

  const globalOpportunities = [
    {
      country: "United States",
      institutions: ["CalArts", "MIT Media Lab", "NYU Tisch"],
      specialties: ["Animation", "Interactive Media", "Digital Arts"],
      flag: "🇺🇸",
      features: ["World-class facilities", "Industry connections", "Research opportunities"],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop&auto=format"
    },
    {
      country: "United Kingdom",
      institutions: ["Royal College of Art", "University of Arts London", "Goldsmiths"],
      specialties: ["Digital Design", "Media Arts", "Creative Technology"],
      flag: "🇬🇧",
      features: ["Historic art heritage", "Modern facilities", "European connections"],
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&auto=format"
    },
    {
      country: "Canada",
      institutions: ["Emily Carr University", "OCAD University", "Concordia"],
      specialties: ["Digital Media", "Game Design", "Interactive Arts"],
      flag: "🇨🇦",
      features: ["Multicultural environment", "Affordable education", "Work opportunities"],
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=250&fit=crop&auto=format"
    },
    {
      country: "Australia",
      institutions: ["RMIT University", "University of Technology Sydney", "Griffith University"],
      specialties: ["Creative Arts", "Digital Media", "Animation"],
      flag: "🇦🇺",
      features: ["Innovation hubs", "Industry partnerships", "Beautiful campuses"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format"
    }
  ];

  const careerPaths = [
    { title: "Digital Artist", icon: "🎨", growth: "+22%", salary: "$65K-$120K", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&auto=format" },
    { title: "UX/UI Designer", icon: "📱", growth: "+13%", salary: "$70K-$130K", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop&auto=format" },
    { title: "Animation Director", icon: "🎬", growth: "+16%", salary: "$75K-$150K", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop&auto=format" },
    { title: "Creative Technologist", icon: "⚡", growth: "+25%", salary: "$80K-$140K", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&auto=format" },
    { title: "VR/AR Developer", icon: "🥽", growth: "+30%", salary: "$85K-$160K", image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=300&h=200&fit=crop&auto=format" },
    { title: "Media Producer", icon: "📺", growth: "+18%", salary: "$60K-$110K", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop&auto=format" }
  ];

  const benefits = [
    {
      icon: "🚀",
      title: "Innovation Focus",
      description: "Stay at the forefront of creative technology and emerging digital trends",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop&auto=format"
    },
    {
      icon: "🤝",
      title: "Industry Connections", 
      description: "Build networks with leading professionals and companies in creative industries",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop&auto=format"
    },
    {
      icon: "🎯",
      title: "Practical Skills",
      description: "Gain hands-on experience with industry-standard tools and technologies",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop&auto=format"
    },
    {
      icon: "🌟",
      title: "Creative Expression",
      description: "Combine artistic vision with technical expertise for unique career paths",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format"
    }
  ];

  return (
    <div className="artstech-container">
      {/* Hero Section */}
      <section className="hero-section" data-animate id="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="tagline">Leading the Future</span>
            <h1 className="hero-title">
              Arts & Technology
              <span className="gradient-text"> Programs</span>
            </h1>
            <p className="hero-subtitle">
              Where creativity meets innovation. Explore cutting-edge programs that blend
              artistic expression with technological advancement.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <h3>1500+</h3>
                <p>Global Universities</p>
              </div>
              <div className="stat-item">
                <h3>95%</h3>
                <p>Employment Rate</p>
              </div>
              <div className="stat-item">
                <h3>$85K</h3>
                <p>Average Salary</p>
              </div>
            </div>

            <div className="hero-actions">
              <button className="hero-btn primary" onClick={() => setIsFormOpen(true)}>
                Explore Programs
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=500&fit=crop&auto=format" 
                alt="Arts & Technology" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Features - Single Row Layout */}
      <section className="features-section" data-animate id="features">
        <div className={`section-header ${isVisible.features ? 'animate-in' : ''}`}>
          <h2>Program Highlights</h2>
          <p>Discover the core areas of study in Arts & Technology programs</p>
        </div>
        <div className="single-row-grid">
          {programFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`single-row-card ${isVisible.features ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="card-image">
                <img src={feature.image} alt={feature.title} />
                <div className="card-overlay">
                  <div className="card-icon">{feature.icon}</div>
                </div>
              </div>
              <div className="card-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={`card-details ${activeCard === feature.id ? 'show' : ''}`}>
                  <p>{feature.details}</p>
                  <div className="skills-list">
                    {feature.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Opportunities - Single Row Layout */}
      <section className="opportunities-section" data-animate id="opportunities">
        <div className={`section-header ${isVisible.opportunities ? 'animate-in' : ''}`}>
          <h2>Global Study Destinations</h2>
          <p>Explore top countries for Arts & Technology education</p>
        </div>
        <div className="single-row-grid">
          {globalOpportunities.map((opportunity, index) => (
            <div
              key={index}
              className={`single-row-card opportunity-card ${isVisible.opportunities ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-image">
                <img src={opportunity.image} alt={opportunity.country} />
                <div className="card-overlay">
                  <span className="country-flag">{opportunity.flag}</span>
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{opportunity.country}</h3>
                </div>
                <div className="institutions">
                  <h4>Top Institutions</h4>
                  <ul>
                    {opportunity.institutions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                </div>
                <div className="specialties">
                  <h4>Specializations</h4>
                  <div className="specialty-tags">
                    {opportunity.specialties.map((spec, idx) => (
                      <span key={idx} className="specialty-tag">{spec}</span>
                    ))}
                  </div>
                </div>
                <div className="features">
                  <h4>Key Features</h4>
                  <ul>
                    {opportunity.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Paths - Two Row Layout (3 cards per row) */}
      <section className="careers-section" data-animate id="careers">
        <div className={`section-header ${isVisible.careers ? 'animate-in' : ''}`}>
          <h2>Career Opportunities</h2>
          <p>Explore exciting career paths in Arts & Technology</p>
        </div>
        <div className="careers-grid">
          {careerPaths.map((career, index) => (
            <div
              key={index}
              className={`career-card ${isVisible.careers ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image">
                <img src={career.image} alt={career.title} />
                <div className="card-overlay">
                  <div className="career-icon">{career.icon}</div>
                </div>
              </div>
              <div className="card-content">
                <h3>{career.title}</h3>
                <div className="career-stats">
                  <div className="stat">
                    <span className="label">Growth</span>
                    <span className="value growth">{career.growth}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Salary Range</span>
                    <span className="value salary">{career.salary}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section - Single Row Layout */}
      <section className="benefits-section" data-animate id="benefits">
        <div className={`section-header ${isVisible.benefits ? 'animate-in' : ''}`}>
          <h2>Why Choose Arts & Technology?</h2>
        </div>
        <div className="single-row-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`single-row-card benefit-card ${isVisible.benefits ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image">
                <img src={benefit.image} alt={benefit.title} />
                <div className="card-overlay">
                  <div className="benefit-icon">{benefit.icon}</div>
                </div>
              </div>
              <div className="card-content">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-animate id="cta">
        <div className={`cta-content ${isVisible.cta ? 'animate-in' : ''}`}>
          <h2>Ready to Start Your Journey?</h2>
          <p>Explore programs, connect with institutions, and take the first step toward your creative-tech career</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* Arts & Technology Form Modal */}
      {isFormOpen && <ArtsTechForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

// Arts & Technology Form Component
const ArtsTechForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    city: '',
    education: '',
    fieldOfInterest: '',
    preferredCountry: '',
    programType: '',
    technicalSkills: '',
    portfolioLink: '',
    previousExperience: '',
    careerGoals: '',
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
      const response = await fetch('/api/arts-tech-application', {
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
          message: 'Application submitted successfully! We will contact you soon with program information.'
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
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>🎨 Arts & Technology Program Application</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="arts-tech-form">
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
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 123-4567"
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
                  placeholder="Enter your country"
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="form-section">
            <h3>Academic & Program Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Current Education Level *</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Education Level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD/Doctorate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Field of Interest *</label>
                <select
                  name="fieldOfInterest"
                  value={formData.fieldOfInterest}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Field of Interest</option>
                  <option value="digital-arts">Digital Arts & Design</option>
                  <option value="media-production">Media Production</option>
                  <option value="interactive-tech">Interactive Technology</option>
                  <option value="digital-communication">Digital Communication</option>
                  <option value="game-design">Game Design</option>
                  <option value="vr-ar">VR/AR Development</option>
                  <option value="animation">Animation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Study Country *</label>
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
                  <option value="netherlands">Netherlands</option>
                  <option value="sweden">Sweden</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Program Type *</label>
                <select
                  name="programType"
                  value={formData.programType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Program Type</option>
                  <option value="undergraduate">Undergraduate Degree</option>
                  <option value="graduate">Graduate Degree</option>
                  <option value="masters">Master's Program</option>
                  <option value="phd">PhD Program</option>
                  <option value="certificate">Certificate Course</option>
                  <option value="diploma">Diploma Program</option>
                </select>
              </div>
            </div>
          </div>

          {/* Experience & Skills */}
          <div className="form-section">
            <h3>Experience & Skills</h3>
            <div className="form-group full-width">
              <label>Technical Skills</label>
              <textarea
                name="technicalSkills"
                value={formData.technicalSkills}
                onChange={handleInputChange}
                rows={3}
                placeholder="List your technical skills (e.g., Adobe Creative Suite, Programming languages, 3D software, etc.)"
              />
            </div>
            
            <div className="form-group full-width">
              <label>Portfolio Link</label>
              <input
                type="url"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com or Behance/Dribbble profile"
              />
            </div>
            
            <div className="form-group full-width">
              <label>Previous Experience</label>
              <textarea
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe any relevant work experience, projects, or creative work..."
              />
            </div>
            
            <div className="form-group full-width">
              <label>Career Goals</label>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleInputChange}
                rows={3}
                placeholder="What are your career aspirations in Arts & Technology?"
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

export default ArtsTech;
