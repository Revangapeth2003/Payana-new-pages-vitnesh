import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import BannerSection from './Baneer';
import Footer from './Footer';
import FooterBanner from './FooterBanner';
import HelpCommunity from './HelpCommunity';
import Invest from './Invest';
import Language from './Language';
import MBBSInfo from './MBBSInfo';
import NewsGPT from './NewsGPT';
import StudyOptions from './StudyOptions';
import Techarts from './Techarts';
import TestimonialSection from './TestimonialSection';
import WhatsAppButton from './WhatsAppButton';
import './Home.css';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(true);

  // Scroll down function
  // const scrollToNextSection = useCallback(() => {
  //   const techSection = document.getElementById('tech');
  //   if (techSection) {
  //     techSection.scrollIntoView({ 
  //       behavior: 'smooth',
  //       block: 'start'
  //     });
  //   } else {
  //     // Fallback scroll
  //     window.scrollTo({
  //       top: window.innerHeight,
  //       behavior: 'smooth'
  //     });
  //   }
  // }, []);

  // Scroll to top function
  // const scrollToTop = useCallback(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // }, []);

  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setShowScrollButton(scrollPosition < 200);
    };

    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Scroll Down Button */}
      
      {/* <button 
        className={`scroll-down-btn ${showScrollButton ? 'visible' : 'hidden'}`}
        onClick={scrollToNextSection}
        aria-label="Scroll down to next section"
        type="button"
      >
        <FaChevronDown className="scroll-icon" />
        <span>Explore More</span>
      </button> */}

      {/* Your existing content */}
      <BannerSection />
      <div id='tech'>
        <Techarts />
      </div>
      <div id='mbbs'>
        <MBBSInfo />
      </div>
      <div id='study'>
        <StudyOptions/>
      </div>
      <div id='language'>
        <Language />
      </div>
      <div id='work'>
        <HelpCommunity />
      </div>
      <div id='invest'>
        <Invest/>
      </div>
      <NewsGPT />
      <TestimonialSection />
      {/* <Footer /> */}
      {/* <FooterBanner/> */}
      <WhatsAppButton />
      
      {/* Scroll to Top Button */}
      {/* <button 
        className={`scroll-top-btn ${!showScrollButton ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        type="button"
      >
        <FaChevronDown className="scroll-icon rotated" />
      </button> */}
    </div>
  )
}

export default Home;
