import express from 'express';
import { sendArtsApplication, sendWelcomeEmail } from '../services/artsEmailServices.js';
import { pool } from '../config/db.js';

const router = express.Router();

// Arts & Technology Program Application Route
router.post('/arts-tech-application', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'country', 'education', 'fieldOfInterest', 'preferredCountry', 'programType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Save to database
    const query = `
      INSERT INTO arts_tech_applications (
        full_name, email, phone, date_of_birth, country, city, education,
        field_of_interest, preferred_country, program_type, technical_skills,
        portfolio_link, previous_experience, career_goals, additional_info,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
      RETURNING id;
    `;

    const values = [
      formData.fullName,
      formData.email,
      formData.phone,
      formData.dateOfBirth || null,
      formData.country,
      formData.city || null,
      formData.education,
      formData.fieldOfInterest,
      formData.preferredCountry,
      formData.programType,
      formData.technicalSkills || null,
      formData.portfolioLink || null,
      formData.previousExperience || null,
      formData.careerGoals || null,
      formData.additionalInfo || null
    ];

    const result = await pool.query(query, values);
    const applicationId = result.rows[0].id;

    // Send application to admin
    await sendArtsApplication(formData, applicationId);
    
    // Send welcome email to applicant
    await sendWelcomeEmail(formData.email, formData.fullName);
    
    res.status(200).json({
      success: true,
      message: 'Arts & Technology application submitted successfully',
      applicationId: applicationId
    });
    
  } catch (error) {
    console.error('Error processing Arts & Technology application:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Get all arts tech applications (admin endpoint)
router.get('/arts-tech-applications', async (req, res) => {
  try {
    const query = `
      SELECT * FROM arts_tech_applications 
      ORDER BY created_at DESC;
    `;
    
    const result = await pool.query(query);
    
    res.status(200).json({
      success: true,
      applications: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching arts tech applications:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get specific arts tech application by ID (admin endpoint)
router.get('/arts-tech-applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT * FROM arts_tech_applications 
      WHERE id = $1;
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      application: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error fetching arts tech application:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
