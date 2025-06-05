import React from "react";
import SectionComponent from '../SectionComponent';
import Accordion from "../Accordian";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionComponent 
        text="FAQs" 
        heading="Frequently Asked Questions" 
        subheading="We got answer to your every question."
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion />
        </motion.div>
      </SectionComponent>
    </motion.div>
  );
};

export default FAQ;
