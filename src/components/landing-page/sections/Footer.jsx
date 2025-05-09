import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About us</h4>
          <ul>
            <li>Homepage</li>
            <li>About</li>
            <li>Products</li>
            <li>Awards & Partners</li>
            <li>Contact Us</li>
          </ul>
        </div>       
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>info@eyeconai.com</li>
            <li>Room 1, Academic Block 3 FAST- National University of Computer Emerging Sciences ST-4, Sector 17-D, Shah Latif Town On National Highway Karachi</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Parent Company</h4>
          <ul>
            <li>
              <img src="/images/logosyslab.svg"  alt="Syslab.AI" className="footer-image" />
            </li>           
            <li>SYSLAB.AI (Private) Limited focuses on providing and developing innovative Artificially Intelligent (AI) solutions</li>
          </ul>
        </div>
      </div>      
      <div className="footer-bottom">
        <ul>
          <li>

        Eyecon AI All rights reserved. ©{new Date().getFullYear()}
          </li>
        </ul>
      </div>
      
      {/* Inline CSS */}
      <style jsx>{`
        /* Footer Styles */
        .footer {
          background-color: #F9F9F9FF;
          padding: 40px 0;
          color: #333;
          width: 100%;
          font-size: 14px;
          border-top: 1px solid #eaeaea;
        }
        .footer-image {
          width: 100px; /* Adjust the width as needed */
          height: auto; /* Maintain aspect ratio */
          margin-top: 10px; /* Add spacing */
        }
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Footer Sections */
        .footer-section {
          flex: 1 1 200px;
          margin-bottom: 20px;
          margin-right: 20px;
        }

        .footer-section:last-child {
          margin-right: 0;
        }

        .footer-section h4 {
          font-weight: bold;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 10px;
        }

        /* Footer Bottom */
        .footer-bottom {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          font-size: 12px;
        }

        /* Social Icons */
        .social-icons {
          margin-top: 10px;
        }

        .social-icons a {
          margin: 0 10px;
          text-decoration: none;
          color: #555;
          font-weight: bold;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
          }

          .footer-section {
            width: 100%;
            text-align: center;
            margin-right: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;