import { transporter } from '../config/mail.js';

export const formatAsTable = obj => `
  <table border="1" cellpadding="8" cellspacing="0"
         style="border-collapse:collapse;max-width:600px;width:100%">
    ${Object.entries(obj).map(
      ([k,v])=>`<tr><th align="left" style="background:#f0f0f0">${k}</th><td>${v}</td></tr>`
    ).join('')}
  </table>`;

// ✅ Original function for sending data to business email
export const sendEmail = (subject,html)=>
  transporter.sendMail(
    { from:process.env.EMAIL_USER,to:process.env.EMAIL_RECIVER,subject,html },
    err=> err
      ? console.error('❌  sendEmail:',err.message)
      : console.log('✅  Email sent')
);

// 🔧 FIXED: Function for sending welcome emails to users
export const sendWelcomeEmail = async (userEmail, userName, formType = 'general') => {
  try {
    console.log(`📧 Attempting to send welcome email to: ${userEmail}`);
    
    let subject = '';
    let html = '';
    
    switch (formType) {
      case 'visa':
        subject = `🛂 Welcome to Payana Overseas - Visa Application Received`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">🛂 Welcome to Payana Overseas!</h2>
            <p>Dear <strong>${userName}</strong>,</p>
            
            <p>Thank you for choosing Payana Overseas for your visa application needs!</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #28a745; margin-top: 0;">✅ Your Application Has Been Received</h3>
              <p>We have successfully received your visa application and our team will review it within <strong>24-48 hours</strong>.</p>
            </div>
            
            <h4>📋 What's Next?</h4>
            <ul>
              <li>Our visa experts will review your application</li>
              <li>We'll contact you if any additional documents are needed</li>
              <li>You'll receive regular updates on your application status</li>
              <li>Expected processing time: 10-15 business days</li>
            </ul>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📞 Need Help?</strong><br>
              Contact us at: <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a><br>
              Or call: +91-XXXXXXXXXX</p>
            </div>
            
            <p>Best regards,<br>
            <strong>Payana Overseas Team</strong><br>
            Your Trusted Visa Partner</p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        `;
        break;
        
      default: // general inquiry
        subject = `💼 Welcome to Payana Overseas - We'll Be In Touch Soon`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">💼 Welcome to Payana Overseas!</h2>
            <p>Dear <strong>${userName}</strong>,</p>
            
            <p>Thank you for reaching out to Payana Overseas! We're excited to help you with your business needs.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #28a745; margin-top: 0;">✅ Your Message Has Been Received</h3>
              <p>We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.</p>
            </div>
            
            <h4>🎯 Why Choose Payana Overseas?</h4>
            <ul>
              <li>✨ Innovation Excellence</li>
              <li>🔒 Security First Approach</li>
              <li>📈 Growth Focused Solutions</li>
              <li>🌐 Global Reach & Experience</li>
              <li>⚡ Fast & Reliable Delivery</li>
            </ul>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📞 Need Immediate Assistance?</strong><br>
              Email: <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a><br>
              Phone: +91-XXXXXXXXXX</p>
            </div>
            
            <p>We look forward to working with you!</p>
            
            <p>Best regards,<br>
            <strong>Payana Overseas Team</strong><br>
            Empowering Your Success</p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        `;
    }
    
    // 🔧 FIXED: Better email configuration and error handling
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      html: html
    });
    
    console.log(`✅ Welcome email sent successfully to: ${userEmail}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error(`❌ Welcome email failed for ${userEmail}:`, error.message);
    console.error('📧 Full error details:', error);
    return { success: false, error: error.message };
  }
};

// 🔧 FIXED: Better combined function with individual error handling
export const sendBothEmails = async (formData, formType = 'general') => {
  console.log(`📧 Starting to send both emails for: ${formData.name} (${formData.email})`);
  
  // Validate required fields
  if (!formData.email || !formData.name) {
    console.error('❌ Missing required fields: email or name');
    return { 
      success: false, 
      error: 'Missing required email or name field',
      businessSent: false,
      welcomeSent: false 
    };
  }

  let businessSent = false;
  let welcomeSent = false;
  let businessError = null;
  let welcomeError = null;

  try {
    // 1. Send business notification email
    console.log('📧 Sending business notification email...');
    const businessHtml = `
      <h2>${formType === 'visa' ? '🛂 New Visa Application' : '💼 New Website Enquiry'}</h2>
      ${formatAsTable(formData)}
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
    `;
    
    const businessSubject = formType === 'visa' 
      ? `Visa Application – ${formData.destination || 'Unknown Destination'} (${formData.name})`
      : `Website enquiry – ${formData.name}`;
    
    try {
      const businessResult = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIVER,
        subject: businessSubject,
        html: businessHtml
      });
      businessSent = true;
      console.log('✅ Business email sent successfully');
      console.log(`📧 Business Message ID: ${businessResult.messageId}`);
    } catch (error) {
      businessError = error.message;
      console.error('❌ Business email failed:', error.message);
    }

    // 2. Send welcome email to user (attempt even if business email failed)
    console.log('📧 Sending welcome email to user...');
    try {
      const welcomeResult = await sendWelcomeEmail(formData.email, formData.name, formType);
      if (welcomeResult.success) {
        welcomeSent = true;
        console.log('✅ Welcome email sent successfully');
      } else {
        welcomeError = welcomeResult.error;
        console.error('❌ Welcome email failed:', welcomeResult.error);
      }
    } catch (error) {
      welcomeError = error.message;
      console.error('❌ Welcome email failed with exception:', error.message);
    }

    // 3. Return comprehensive result
    const overallSuccess = businessSent && welcomeSent;
    
    console.log(`📊 Email sending summary:`);
    console.log(`   Business email: ${businessSent ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Welcome email: ${welcomeSent ? '✅ Success' : '❌ Failed'}`);
    
    return {
      success: overallSuccess,
      businessSent,
      welcomeSent,
      businessError,
      welcomeError,
      message: overallSuccess 
        ? 'Both emails sent successfully' 
        : `Partial success: Business(${businessSent ? 'sent' : 'failed'}), Welcome(${welcomeSent ? 'sent' : 'failed'})`
    };
    
  } catch (error) {
    console.error('❌ Unexpected error in sendBothEmails:', error.message);
    return { 
      success: false, 
      error: error.message, 
      businessSent, 
      welcomeSent,
      businessError,
      welcomeError
    };
  }
};

export async function sendChatbotEmail(emailData,type){
  try{
    let subject='',html='';
    switch(type){
      case 'german':
        subject = `🇩🇪 New German Program Inquiry - ${emailData.name}`;
        html = `
          <h2>🇩🇪 New German Program Application</h2>
          ${formatAsTable(emailData)}
        `;
        break;
      case 'ug':
        subject = `🎓 New UG Program Inquiry - ${emailData.name}`;
        html = `
          <h2>🎓 New UG Program Application</h2>
          ${formatAsTable(emailData)}
        `;
        break;
      case 'study':
        subject = `📚 New Study Program Inquiry - ${emailData.name}`;
        html = `
          <h2>📚 New Study Program Application</h2>
          ${formatAsTable(emailData)}
        `;
        break;
      default:
        throw new Error('Unknown email type');
    }
    await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to  :process.env.EMAIL_RECIVER,
      cc  :emailData.email,
      subject, html
    });
    console.log(`✅  ${type} chatbot email sent`);
    return true;
  }catch(err){
    console.error(`❌  ${type} chatbot email error:`,err.message);
    return false;
  }
}
