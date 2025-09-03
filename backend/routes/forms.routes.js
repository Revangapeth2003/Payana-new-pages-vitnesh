import { Router } from 'express';
import { sendBothEmails } from '../services/emailService.js';
const r = Router();

/* ✅ Updated: Now sends both business and welcome emails */
r.post('/send-email', async (req, res) => {
  const { formData } = req.body || {};

  if (!formData) {
    return res.status(400).json({ success: false, message: 'Missing formData' });
  }

  // Validate that user email exists
  if (!formData.email) {
    return res.status(400).json({ 
      success: false, 
      message: 'User email is required to send confirmation' 
    });
  }

  try {
    console.log('📧 Sending both business and welcome emails for:', formData.name || 'unknown');
    
    // 🚀 Send both emails using the new combined function
    const emailResult = await sendBothEmails(formData, 'general');
    
    if (emailResult.success) {
      console.log('✅ Both emails sent successfully');
      return res.json({ 
        success: true, 
        message: 'Inquiry submitted successfully. Check your email for confirmation!' 
      });
    } else {
      throw new Error(emailResult.error || 'Email sending failed');
    }
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send emails. Please try again later.'
    });
  }
});

/* …existing study / work / invest routes stay below … */

export default r;
