import React from 'react';

const Footer = () => {
  const handleCareerEmail = () => {
    const email = 'hr@syslab.ai';
    const subject = encodeURIComponent('Career Opportunities Inquiry');
    const body = encodeURIComponent(
      `Dear HR Team,\n\nI am writing to inquire about any current career opportunities at SysLab.AI. I am particularly interested in contributing to your innovative AI solutions and would appreciate any information about open positions.\n\nThank you for your time and consideration.\n\nBest regards,`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="text-gray-800 py-5 w-full text-xs border-t border-gray-200">
      <div className="flex flex-wrap justify-center max-w-7xl mx-auto px-2.5">
        <div className="flex-1 min-w-[200px] mb-4 mr-4 text-center">
          <h4 className="font-bold mb-2.5 text-sm">Eyecon AI</h4>
          <ul className="list-none p-0">
            <li className="mb-2">Home</li>
            <li className="mb-2">Research</li>
            <li className="mb-2">
              <button 
                onClick={handleCareerEmail}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Explore Careers
              </button>
            </li>
            <li className="mb-2">
              <a 
                href="https://syslab.ai/#[object%20Object]"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Awards & Partners
              </a>
            </li>
            <li className="mb-2">Contact Us</li>
          </ul>
        </div>       
        <div className="flex-1 min-w-[200px] mb-4 mr-4 text-center">
          <h4 className="font-bold mb-2.5 text-sm">Contact Us</h4>
          <ul className="list-none p-0">
            <li className="mb-2">info@eyeconai.com</li>
            <li className="mb-2">FAST- National University of Computer Emerging Sciences ST-4, Sector 17-D, Shah Latif Town National Highway Karachi</li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px] mb-4 text-center">
          <h4 className="font-bold mb-2.5 text-sm">Parent Company</h4>
          <ul className="list-none p-0">
            <li className="mb-2">
              <img src="/images/logosyslab.svg" alt="Syslab.AI" className="w-20 h-auto mt-2.5 mx-auto" />
            </li>           
            <li className="mb-2">SYSLAB.AI (Private) focuses on developing AI products</li>
          </ul>
        </div>
      </div>      
      <div className="text-center mt-4 pt-4 text-xs">
        <ul className="list-none p-0">
          <li className="flex items-center justify-center gap-2">
            <span>Eyecon AI All rights reserved. ©{new Date().getFullYear()}</span>
            <a 
              href="https://www.linkedin.com/company/eyeconai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img 
                src="/images/linkedin.png" 
                alt="LinkedIn" 
                className="w-5 h-5 object-contain"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;