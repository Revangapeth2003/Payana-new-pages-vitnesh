import React from 'react';
import ChatBot from './Chatbot';
import StipendProgram from './StipendProgram';

const Eligibility = () => {
  return (
    // <div className="page-container">
    //   <div className="page-content">
    //     <h1>Eligibility Check</h1>
    //     <p>Check your eligibility for study abroad programs</p>
        
    //     {/* Fixed image path - removed /public/ */}
    //     <img src="/payanatopnew.jpg" alt="Payana Logo" />
        
    //     <div className="eligibility-form">
    //       <h2>Quick Eligibility Assessment</h2>
    //       <form>
    //         <div className="form-group">
    //           <label>Education Level:</label>
    //           <select>
    //             <option>Select Education Level</option>
    //             <option>High School</option>
    //             <option>Bachelor's Degree</option>
    //             <option>Master's Degree</option>
    //           </select>
    //         </div>
            
    //         <div className="form-group">
    //           <label>Preferred Destination:</label>
    //           <select>
    //             <option>Select Country</option>
    //             <option>Germany</option>
    //             <option>Canada</option>
    //             <option>Australia</option>
    //             <option>UK</option>
    //           </select>
    //         </div>
            
    //         <button type="submit" className="submit-btn">
    //           Check Eligibility
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div>
      {/* <ChatBot/> */}
      <StipendProgram/>
    </div>
    
  );
};

export default Eligibility;
