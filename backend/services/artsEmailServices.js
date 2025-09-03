import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter - FIXED: createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send Arts & Technology application to admin
export const sendArtsApplication = async (formData, applicationId) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Arts & Technology Application</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .email-container {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .footer {
          background: #374151;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .info-section {
          background: #f8fafc;
          margin: 25px 0;
          padding: 25px;
          border-radius: 10px;
          border-left: 5px solid #667eea;
        }
        .info-section h2 {
          color: #374151;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 20px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 10px;
        }
        .field-row {
          margin: 12px 0;
          display: flex;
          align-items: flex-start;
        }
        .label {
          font-weight: bold;
          color: #374151;
          min-width: 180px;
          margin-right: 10px;
        }
        .value {
          color: #6b7280;
          flex: 1;
          word-break: break-word;
        }
        .highlight {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: bold;
          display: inline-block;
        }
        .app-id {
          background: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
          display: inline-block;
          margin: 15px 0;
        }
        .text-area {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin-top: 5px;
          font-style: italic;
          color: #4b5563;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🎨 New Arts & Technology Application</h1>
          <p>A new application has been submitted for Arts & Technology programs</p>
          <div class="app-id">Application ID: #${applicationId}</div>
        </div>
        
        <div class="content">
          <div class="info-section">
            <h2>📋 Personal Information</h2>
            <div class="field-row">
              <span class="label">Full Name:</span>
              <span class="value">${formData.fullName}</span>
            </div>
            <div class="field-row">
              <span class="label">Email Address:</span>
              <span class="value">${formData.email}</span>
            </div>
            <div class="field-row">
              <span class="label">Phone Number:</span>
              <span class="value">${formData.phone}</span>
            </div>
            <div class="field-row">
              <span class="label">Date of Birth:</span>
              <span class="value">${formData.dateOfBirth || 'Not provided'}</span>
            </div>
            <div class="field-row">
              <span class="label">Location:</span>
              <span class="value">${formData.city ? formData.city + ', ' : ''}${formData.country}</span>
            </div>
          </div>
          
          <div class="info-section">
            <h2>🎓 Academic & Program Information</h2>
            <div class="field-row">
              <span class="label">Education Level:</span>
              <span class="value">${formData.education}</span>
            </div>
            <div class="field-row">
              <span class="label">Field of Interest:</span>
              <span class="highlight">${formData.fieldOfInterest}</span>
            </div>
            <div class="field-row">
              <span class="label">Preferred Country:</span>
              <span class="value">${formData.preferredCountry}</span>
            </div>
            <div class="field-row">
              <span class="label">Program Type:</span>
              <span class="value">${formData.programType}</span>
            </div>
          </div>
          
          <div class="info-section">
            <h2>💻 Experience & Skills</h2>
            <div class="field-row">
              <span class="label">Technical Skills:</span>
            </div>
            ${formData.technicalSkills ? `<div class="text-area">${formData.technicalSkills}</div>` : '<div class="value">Not provided</div>'}
            
            <div class="field-row" style="margin-top: 20px;">
              <span class="label">Portfolio Link:</span>
              <span class="value">${formData.portfolioLink ? `<a href="${formData.portfolioLink}" target="_blank" style="color: #667eea; text-decoration: none;">${formData.portfolioLink}</a>` : 'Not provided'}</span>
            </div>
            
            <div class="field-row" style="margin-top: 20px;">
              <span class="label">Previous Experience:</span>
            </div>
            ${formData.previousExperience ? `<div class="text-area">${formData.previousExperience}</div>` : '<div class="value">Not provided</div>'}
            
            <div class="field-row" style="margin-top: 20px;">
              <span class="label">Career Goals:</span>
            </div>
            ${formData.careerGoals ? `<div class="text-area">${formData.careerGoals}</div>` : '<div class="value">Not provided</div>'}
            
            <div class="field-row" style="margin-top: 20px;">
              <span class="label">Additional Information:</span>
            </div>
            ${formData.additionalInfo ? `<div class="text-area">${formData.additionalInfo}</div>` : '<div class="value">Not provided</div>'}
          </div>
          
          <div class="info-section">
            <h2>📅 Submission Details</h2>
            <div class="field-row">
              <span class="label">Submitted On:</span>
              <span class="value">${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
              })}</span>
            </div>
            <div class="field-row">
              <span class="label">Application ID:</span>
              <span class="app-id">#${applicationId}</span>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <h3>🎨 Arts & Technology Program Application System</h3>
          <p>This is an automated email notification</p>
          <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
            Please review this application and contact the applicant within 48 hours
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIVER,
    subject: `🎨 New Arts & Technology Application - ${formData.fullName} (#${applicationId})`,
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};

// Send welcome email to applicant
export const sendWelcomeEmail = async (email, name) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Arts & Technology Programs</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .email-container {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 50px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
        }
        .header p {
          margin: 15px 0 0 0;
          font-size: 18px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .footer {
          background: #f8fafc;
          padding: 40px 30px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .highlight-box {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 30px;
          border-radius: 12px;
          margin: 30px 0;
          text-align: center;
        }
        .highlight-box h3 {
          margin: 0 0 10px 0;
          font-size: 22px;
        }
        .features {
          background: #f8fafc;
          padding: 30px;
          border-radius: 12px;
          margin: 30px 0;
        }
        .features h3 {
          color: #374151;
          margin-bottom: 20px;
          font-size: 20px;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          margin: 15px 0;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        .feature-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-weight: bold;
          font-size: 18px;
          flex-shrink: 0;
        }
        .feature-text {
          font-size: 16px;
          color: #4b5563;
        }
        .programs-list {
          background: #f0f9ff;
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
        }
        .programs-list h3 {
          color: #1e3a8a;
          margin-bottom: 15px;
        }
        .programs-list ul {
          list-style: none;
          padding: 0;
        }
        .programs-list li {
          padding: 8px 0;
          border-bottom: 1px solid #dbeafe;
          display: flex;
          align-items: center;
        }
        .programs-list li:last-child {
          border-bottom: none;
        }
        .program-icon {
          margin-right: 10px;
          font-size: 18px;
        }
        .stats-box {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 25px;
          border-radius: 12px;
          margin: 30px 0;
          text-align: center;
        }
        .stats-box h3 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        .contact-info {
          background: #fef7ff;
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
          border: 2px solid #e879f9;
        }
        .contact-info h3 {
          color: #86198f;
          margin-bottom: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🎨 Welcome to Arts & Technology Programs!</h1>
          <p>Your journey into creative innovation begins here</p>
        </div>
        
        <div class="content">
          <h2 style="color: #374151; margin-bottom: 20px;">Dear ${name},</h2>
          
          <p style="font-size: 16px; margin-bottom: 25px;">
            Thank you for your interest in our <strong>Arts & Technology programs</strong>! We're thrilled that you're considering joining our community of creative innovators and technology pioneers.
          </p>
          
          <div class="highlight-box">
            <h3>✅ Application Received Successfully!</h3>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your application has been submitted and is now being reviewed by our specialized admissions team.</p>
          </div>
          
          <h3 style="color: #374151; margin: 30px 0 20px 0;">🚀 What Happens Next?</h3>
          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">1</div>
              <div class="feature-text">Our expert team will review your application within <strong>3-5 business days</strong></div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">2</div>
              <div class="feature-text">You'll receive <strong>personalized program recommendations</strong> based on your interests and goals</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">3</div>
              <div class="feature-text">A specialized <strong>Arts & Technology counselor</strong> will contact you to discuss your options</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">4</div>
              <div class="feature-text">We'll provide <strong>step-by-step guidance</strong> through the entire application process</div>
            </div>
          </div>
          
          <div class="programs-list">
            <h3>🎯 Program Areas We Specialize In:</h3>
            <ul>
              <li><span class="program-icon">🎨</span> Digital Arts & Design</li>
              <li><span class="program-icon">🎬</span> Media Production & Filmmaking</li>
              <li><span class="program-icon">💻</span> Interactive Technology & UX/UI</li>
              <li><span class="program-icon">🌐</span> Digital Communication & Marketing</li>
              <li><span class="program-icon">🥽</span> VR/AR Development & Immersive Media</li>
              <li><span class="program-icon">🎮</span> Game Design & Development</li>
              <li><span class="program-icon">🤖</span> Creative Technology & AI</li>
            </ul>
          </div>
          
          <div class="stats-box">
            <h3>📊 Why Our Students Succeed</h3>
            <p style="margin: 0; font-size: 18px;"><strong>95%</strong> employment rate within 6 months • Average starting salary <strong>$85,000</strong> • <strong>1500+</strong> global university partnerships</p>
          </div>
          
          <div class="contact-info">
            <h3>💬 Need Immediate Assistance?</h3>
            <p style="margin: 0; color: #6b21a8;">
              Our Arts & Technology specialists are here to help! Feel free to reply to this email with any questions about programs, requirements, or the application process.
            </p>
          </div>
          
          <p style="font-size: 16px; margin: 30px 0 20px 0;">
            We're excited to help you <strong>transform your creative passion into a successful global career</strong>!
          </p>
          
          <p style="margin: 30px 0 0 0;">
            Best regards,<br>
            <strong style="color: #667eea;">The Arts & Technology Admissions Team</strong><br>
            <em>Empowering Creative Innovation Worldwide</em>
          </p>
        </div>
        
        <div class="footer">
          <h3 style="color: #667eea; margin: 0 0 10px 0;">🎨 Arts & Technology Programs</h3>
          <p style="margin: 0; color: #6b7280;">Where Creativity Meets Technology</p>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
            This is an automated email. For immediate assistance, please reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🎨 Welcome to Arts & Technology Programs - Your Creative Journey Starts Now!',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};
