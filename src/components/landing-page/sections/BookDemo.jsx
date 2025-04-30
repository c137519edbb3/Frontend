import React from "react";
import SectionComponent from '../SectionComponent';
import { motion } from 'framer-motion';

const BookDemo = () => {
  return (
      <SectionComponent 
        text="Deal" 
        heading="Ready to scale your brand to new heights?" 
        subheading="If you want to achieve ground-breaking growth with increased sales and profitability with paid ads, then you're in the right place."
      >
        <motion.button
          whileHover={{
            scale: 1.1, // Slightly increases the size when hovered
            boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.2)", // Glowing effect
            transition: { duration: 0.3 }, // Smooth transition
          }}
          whileTap={{ scale: 0.95 }} // Pressing down effect
          style={{
            background: 'linear-gradient(135deg, #6a00ff, #a600ff)', // Gradient background
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            outline: 'none',
          }}
        >
          Book your Demo
        </motion.button>

      </SectionComponent>
  );
};

export default BookDemo;
