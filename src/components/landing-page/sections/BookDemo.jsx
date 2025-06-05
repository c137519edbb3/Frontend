import React from "react";
import SectionComponent from '../SectionComponent';
import { motion } from 'framer-motion';
import { AuroraBackground } from "@/components/ui/aurora-background";

const BookDemo = () => {
  const handleEmailClick = () => {
    const email = 'info@syslab.ai';
    const subject = encodeURIComponent('Inquiry from Website');
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in exploring your services. I would appreciate it if you could provide a demo or something similar.\n\nBest regards,`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  
  

  return (
    <div className="w-auto bg-[#7f92ee] mx-0 sm:mx-32 lg:mx-32 md:mx-32 rounded-3xl">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <SectionComponent 
            text="Deal" 
            heading="Deploy Vision Intelligence at Scale" 
            subheading="Transform how your business perceives, understands, and acts—through intelligent visual solutions."
          >
            <motion.button
              onClick={handleEmailClick}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #6a57ff, #523bff)',
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
        </motion.div>
      </AuroraBackground>

      {/* <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
      </motion.div>
    </AuroraBackground> */}
    </div>
  );
};

export default BookDemo;
