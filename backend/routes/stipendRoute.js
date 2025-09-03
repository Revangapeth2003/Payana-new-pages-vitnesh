import express from 'express';
import { pool } from '../config/db.js';
import { sendStipendNotificationEmail, sendStipendThankYouEmail } from '../services/stipendEmailService.js';

const router = express.Router();

// Submit scholarship application
router.post('/submit-stipend-form', async (req, res) => {
  console.log('📋 Stipend form submission:', req.body);
  
  const {
    fullName, email, phone, country, city, dateOfBirth,
    education, fieldOfStudy, preferredCountry, scholarshipType,
    englishProficiency, workExperience, financialNeed,
    academicAchievements, additionalInfo
  } = req.body;

  // Validation
  if (!fullName || !email || !phone || !country || !preferredCountry) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['fullName', 'email', 'phone', 'country', 'preferredCountry']
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Insert into database
    const insertQuery = `
      INSERT INTO stipend_applications (
        full_name, email, phone, country, city, date_of_birth,
        education, field_of_study, preferred_country, scholarship_type,
        english_proficiency, work_experience, financial_need,
        academic_achievements, additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, created_at
    `;
    
    const values = [
      fullName, email, phone, country, city, dateOfBirth,
      education, fieldOfStudy, preferredCountry, scholarshipType,
      englishProficiency, workExperience, financialNeed,
      academicAchievements, additionalInfo
    ];
    
    const result = await client.query(insertQuery, values);
    const applicationId = result.rows[0].id;
    const createdAt = result.rows[0].created_at;
    
    await client.query('COMMIT');
    console.log(`✅ Application #${applicationId} saved to database`);
    
    // Prepare email data
    const emailData = {
      fullName, email, phone, country, city, dateOfBirth,
      education, fieldOfStudy, preferredCountry, scholarshipType,
      englishProficiency, workExperience, financialNeed,
      academicAchievements, additionalInfo, applicationId, submittedAt: createdAt
    };
    
    // Send emails sequentially with proper error handling
    let emailStatus = {
      adminEmailSent: false,
      userEmailSent: false,
      errors: []
    };

    try {
      // First send admin notification
      console.log(`📧 Sending admin notification email...`);
      const adminResult = await sendStipendNotificationEmail(emailData);
      emailStatus.adminEmailSent = true;
      console.log(`✅ Admin notification sent successfully:`, adminResult.messageId);
      
      // Wait 2 seconds before sending user email
      console.log(`⏱️ Waiting 2 seconds before sending user email...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Then send thank you email to user
      console.log(`📧 Sending thank you email to: ${email}`);
      const userResult = await sendStipendThankYouEmail(email, fullName, applicationId);
      emailStatus.userEmailSent = true;
      console.log(`✅ Thank you email sent successfully to ${email}:`, userResult.messageId);
      
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      emailStatus.errors.push(emailError.message);
      
      // Try to determine which email failed
      if (!emailStatus.adminEmailSent) {
        console.error('❌ Admin notification email failed');
      } else if (!emailStatus.userEmailSent) {
        console.error('❌ User thank you email failed');
        
        // Retry user email once
        try {
          console.log(`🔄 Retrying user email to: ${email}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          const retryResult = await sendStipendThankYouEmail(email, fullName, applicationId);
          emailStatus.userEmailSent = true;
          console.log(`✅ User email retry successful:`, retryResult.messageId);
        } catch (retryError) {
          console.error('❌ User email retry also failed:', retryError);
          emailStatus.errors.push(`Retry failed: ${retryError.message}`);
        }
      }
    }
    
    // Response with email status
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      data: { 
        fullName, 
        email, 
        preferredCountry, 
        submittedAt: createdAt 
      },
      emailStatus: {
        adminEmailSent: emailStatus.adminEmailSent,
        userEmailSent: emailStatus.userEmailSent,
        message: emailStatus.userEmailSent ? 
          'Both emails sent successfully' : 
          'Application saved but user email may have failed - please check spam folder'
      }
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error submitting application:', error);
    res.status(500).json({
      error: 'Failed to submit application',
      message: 'Please try again later',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    client.release();
  }
});

// Get all applications (admin)
router.get('/stipend-applications', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM stipend_applications 
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      count: result.rows.length,
      applications: result.rows
    });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get specific application by ID
router.get('/stipend-applications/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT * FROM stipend_applications WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Application not found'
      });
    }
    
    res.json({
      success: true,
      application: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error fetching application:', error);
    res.status(500).json({
      error: 'Failed to fetch application'
    });
  }
});

export default router;
