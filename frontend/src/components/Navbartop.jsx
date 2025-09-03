import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaEnvelope, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import './Navbartop.css';

const Navbartop = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (category, event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpenDropdown(openDropdown === category ? null : category);
    };

    const handleDropdownItemClick = () => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    // Contact handlers
    const handlePhoneClick = () => {
        window.open('tel:+919003619777', '_self');
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/919003946446', '_blank');
    };

    const handleEmailClick = () => {
        window.open('mailto:Study@payanaoverseas.com', '_self');
    };

    const dropdownContent = {
        study: [
            { label: 'Arts/Tech', route: '/study/arts-tech' },
            { label: 'MBBS', route: '/study/mbbs' },
            { label: 'Medical PG', route: '/study/medical-pg' },
            { label: 'Stipent Program', route: '/study/stipent-program' }
        ],
        work: [
            { label: 'Internship Program', route: '/work/internship-program' },
            { label: 'Jobs in Germany', route: '/work/jobs-germany' },
            { label: 'Jobs in Canada', route: '/work/jobs-canada' }
        ],
        coaching: [
            { label: 'IELTS', route: '/coaching/ielts' },
            { label: 'PTE', route: '/coaching/pte' },
            { label: 'TOEFL', route: '/coaching/toefl' },
            { label: 'LANGUAGE', route: '/coaching/language' }
        ]
    };

    const navItems = [
        { category: 'eligibility', label: 'Eligibility Check', route: '/eligibility' },
        { category: 'study', label: 'Study', route: '/study' },
        { category: 'work', label: 'Work', route: '/work' },
        { category: 'coaching', label: 'Coaching', route: '/coaching' },
        { category: 'visa', label: 'Visa', route: '/visa' },
        { category: 'investment', label: 'About', route: '/about' }
    ];

    // Close dropdown when clicking outside or when route changes
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenDropdown(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <div className='navbartop'>
            <div className='logo-section'>
                <Link to="/">
                    <img src="new.png" alt="Logo" />
                </Link>
            </div>
            
            <div className="redlogo"></div>
            
            <div className="coloumintop">
                {/* Contact info with working functionality */}
                <ul className='contact-info'>
                    <li onClick={handlePhoneClick} className="contact-item phone-contact">
                        <FaPhone className="icon phone-icon" size={18} />
                        <span>+91 90036 19777</span>
                    </li>
                    <li onClick={handleWhatsAppClick} className="contact-item whatsapp-contact">
                        <FaWhatsapp className="icon whatsapp-icon" size={20} />
                        <span>+91 90039 46446</span>
                    </li>
                    <li onClick={handleEmailClick} className="contact-item email-contact">
                        <FaEnvelope className="icon email-icon" size={20} />
                        <span>Study@payanaoverseas.com</span>
                    </li>
                </ul>

                {/* Mobile menu button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className={`contact-nav ${isMobileMenuOpen ? 'show' : ''}`}>
                    <ul className='nav-links'>
                        {navItems.map((item, index) => (
                            <li
                                key={item.category}
                                data-category={item.category}
                                className={`nav-item nav-item-${index + 1} ${dropdownContent[item.category] ? 'has-dropdown' : ''} ${openDropdown === item.category ? 'dropdown-open' : ''}`}
                            >
                                {dropdownContent[item.category] ? (
                                    <>
                                        <button
                                            onClick={(e) => toggleDropdown(item.category, e)}
                                            className="nav-item-content dropdown-trigger"
                                            aria-expanded={openDropdown === item.category}
                                        >
                                            <span className="nav-text">{item.label}</span>
                                            <FaChevronDown className={`dropdown-arrow ${openDropdown === item.category ? 'rotated' : ''}`} />
                                        </button>
                                        <div className={`dropdown-menu ${openDropdown === item.category ? 'show' : ''}`}>
                                            {dropdownContent[item.category].map((dropItem) => (
                                                <Link
                                                    key={dropItem.route}
                                                    to={dropItem.route}
                                                    className="dropdown-item"
                                                    onClick={handleDropdownItemClick}
                                                >
                                                    {dropItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link 
                                        to={item.route} 
                                        className="nav-item-content nav-link"
                                        onClick={handleNavClick}
                                    >
                                        <span className="nav-text">{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbartop;
