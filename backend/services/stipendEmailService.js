import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Gmail-optimized transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password here
  },
  tls: {
    rejectUnauthorized: false
  },
  // Add these Gmail-specific options
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 5
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Gmail connection failed:', error);
  } else {
    console.log('✅ Gmail transporter ready');
  }
});

// Admin notification (same as before)
export const sendStipendNotificationEmail = async (formData) => {
  const {
    fullName, email, phone, country, city, dateOfBirth,
    education, fieldOfStudy, preferredCountry, scholarshipType,
    englishProficiency, workExperience, financialNeed,
    academicAchievements, additionalInfo, applicationId, submittedAt
  } = formData;

  const mailOptions = {
    from: `"Payana Overseas" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECIVER,
    replyTo: process.env.EMAIL_USER,
    subject: `🎓 New Scholarship Application - ${fullName}`,
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    },
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e40af;">🎓 New Scholarship Application</h1>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2>Application Details</h2>
          <p><strong>ID:</strong> #${applicationId}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Preferred Country:</strong> ${preferredCountry}</p>
          <p><strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString()}</p>
        </div>
        
        <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <p>Contact: <strong>${email}</strong> | <strong>${phone}</strong></p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Admin email failed:', error);
    throw error;
  }
};

// User thank you email with anti-spam measures
export const sendStipendThankYouEmail = async (recipientEmail, fullName, applicationId) => {
  const mailOptions = {
    from: `"Payana Overseas Education" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    replyTo: process.env.EMAIL_USER,
    subject: '🎓 Scholarship Application Received - Payana Overseas',
    
    // Add anti-spam headers
    headers: {
      'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`,
      'X-Mailer': 'Payana Overseas System',
      'X-Priority': '3',
      'Reply-To': process.env.EMAIL_USER
    },
    
    // Plain text version (important for deliverability)
    text: `Dear ${fullName},

Thank you for your scholarship application! 

Your application has been received successfully and will be reviewed within 24-48 hours.

Application ID: ${applicationId || 'N/A'}

Our team will contact you soon with next steps.

Best regards,
Payana Overseas Team
Email: ${process.env.EMAIL_USER}

---
This is an automated message. Please do not reply to this email.`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; font-size: 24px; margin: 0;">🎓 Payana Overseas</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Global Education Services</p>
          </div>

          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin-bottom: 25px;">
            <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 20px;">Application Received Successfully!</h2>
            <p style="margin: 0; color: #333;">Dear <strong>${fullName}</strong>, thank you for your scholarship application.</p>
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #1e40af; font-size: 18px;">What happens next:</h3>
            <ol style="color: #555; line-height: 1.6;">
              <li>Our team reviews your application (24-48 hours)</li>
              <li>We'll match you with suitable scholarships</li>
              <li>A counselor will contact you with opportunities</li>
              <li>We'll guide you through the application process</li>
            </ol>
          </div>

          ${applicationId ? `
            <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
              <p style="margin: 0; color: #333;"><strong>Your Application ID:</strong> <span style="color: #1e40af; font-weight: bold;">#${applicationId}</span></p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Please keep this ID for your records.</p>
            </div>
          ` : ''}

          <div style="background: #1e40af; color: white; text-align: center; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0;">Need Help?</h3>
            <p style="margin: 0;">📧 Email: <strong>${process.env.EMAIL_USER}</strong></p>
          </div>

          <div style="text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="margin: 0;">© 2024 Payana Overseas. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This is an automated message. Please do not reply to this email.</p>
          </div>

        </div>
      </div>
    `
  };

  try {
    // Add delay before sending user email
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Thank you email sent to ${recipientEmail}:`, info.messageId);
    return { success: true, messageId: info.messageId, recipient: recipientEmail };
  } catch (error) {
    console.error(`❌ Thank you email failed for ${recipientEmail}:`, error);
    throw error;
  }
};
