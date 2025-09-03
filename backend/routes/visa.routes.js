import { Router } from 'express';
import { sendBothEmails } from '../services/emailService.js';

const router = Router();

/* 🛂 Visa Application endpoint - ✅ Updated: Now sends both business and welcome emails */
router.post('/visa-application', async (req, res) => {
  console.log('📧 Visa application endpoint hit');
  console.log('Request body:', req.body);
  
  try {
    const { formData } = req.body || {};

    if (!formData) {
      console.log('❌ Missing formData');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing visa application data' 
      });
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'destination', 'visaType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.log('❌ Missing required fields:', missingFields);
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    console.log('📝 Processing visa application for:', formData.name);
    console.log('📨 Sending both business and welcome emails...');

    // 🚀 Send both emails using the new combined function
    const emailResult = await sendBothEmails(formData, 'visa');
    
    if (emailResult.success) {
      console.log('✅ Visa application emails sent successfully');
      return res.json({ 
        success: true, 
        message: 'Visa application submitted successfully! Check your email for confirmation.' 
      });
    } else {
      throw new Error(emailResult.error || 'Email sending failed');
    }

  } catch (error) {
    console.error('💥 Error in visa application endpoint:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit visa application. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
