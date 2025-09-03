import { pool } from '../config/db.js';

export async function createTables(){
  const client = await pool.connect();
  try{
    /* Your existing SQL for study, work_profiles, invest, chatbot_users, etc. */
    
    // Stipend applications table (existing)
    await client.query(`
      CREATE TABLE IF NOT EXISTS stipend_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        country VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        date_of_birth DATE,
        education VARCHAR(100),
        field_of_study VARCHAR(255),
        preferred_country VARCHAR(100) NOT NULL,
        scholarship_type VARCHAR(100),
        english_proficiency VARCHAR(100),
        work_experience TEXT,
        financial_need TEXT,
        academic_achievements TEXT,
        additional_info TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ✅ NEW: Arts & Technology applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS arts_tech_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        date_of_birth DATE,
        country VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        education VARCHAR(100) NOT NULL,
        field_of_interest VARCHAR(100) NOT NULL,
        preferred_country VARCHAR(100) NOT NULL,
        program_type VARCHAR(100) NOT NULL,
        technical_skills TEXT,
        portfolio_link VARCHAR(500),
        previous_experience TEXT,
        career_goals TEXT,
        additional_info TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ All tables created successfully including stipend_applications and arts_tech_applications');
    
  }catch(err){
    console.error('❌ Table creation error:',err.message);
  }finally{ 
    client.release(); 
  }
}
