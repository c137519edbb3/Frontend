import React from "react";
import SectionComponent from '../SectionComponent';
import Accordion from "../Accordian";

const FAQ = () => {
  return (

    <SectionComponent 
        text="FAQs" 
        heading="Frequently Asked Questions" 
        subheading="We got answer to your every question."
      >
        <Accordion />
    </SectionComponent>
  
  );
};

export default FAQ;
