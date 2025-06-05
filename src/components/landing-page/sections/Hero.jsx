"use client";
import React from "react";
import "./Hero.css";
import SectionComponent from '../SectionComponent';
import { ContainerScroll } from "../ui/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";

import {
  Eye,
  FileText,
  MessageCircle,
  Wallet,
  PlugZap,
  BadgeCheck,
  BrainCircuit,
  Video,
  Bell,
  AlertTriangle,
  Timer,
} from "lucide-react";

const Hero = () => {
  const images = [
    { src: "/images/org01.png", alt: "Organization 1" },
    { src: "/images/org02.png", alt: "Organization 2" },
    { src: "/images/org03.png", alt: "Organization 3" },
    { src: "/images/org04.png", alt: "Organization 4" },
  ];

  const handleEmailClick = () => {
    const email = 'info@syslab.ai';
    const subject = encodeURIComponent('Inquiry from Website');
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in exploring your services. I would appreciate it if you could provide a demo or something similar.\n\nBest regards,`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sm:mt-16 md:mt-16 lg:mt-32 mt-32 h-screen"
    >
      <SectionComponent 
        text="Stay Safe Today" 
        heading="Context Changes Everything" 
        subheading="Context-based Detection of Mixed-Criticality Events using Computer Vision."
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-row items-center justify-center space-x-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-lg p-px text-sm font-medium leading-6 text-white inline-flex items-center justify-center"
            >
              <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div 
                onClick={handleEmailClick}
                className="relative flex space-x-2 items-center z-10 rounded-lg bg-zinc-950 py-2.5 px-5 ring-1 ring-white/10 cursor-pointer"
              >
                <span>Book a Demo</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex justify-center items-center py-2.5 px-5 text-sm font-medium text-center text-gray-700 border border-gray-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 backdrop-blur-sm bg-white/30"
            >
              Live Demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ContainerScroll>
              <img
                src="/images/dashboard.avif"
                alt="hero"
                className="md:w-full h-auto max-w-5xl mt-16 mb-0 w-0" 
                draggable={false}
              />
            </ContainerScroll>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="items-center overflow-hidden"
          >
            <SubjectStrip />
          </motion.div>
        </motion.div>
      </SectionComponent>
    </motion.div>
  );
};

export default Hero;

const SubjectStrip = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="h-[10rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
    >
      <InfiniteMovingCards
        items={subjects}
        direction="left"
        speed="normal"
      />
    </motion.div>
  );
}

const subjects = [
  { name: "Real-time Detection", icon: Eye },
  { name: "Reports", icon: FileText },
  { name: "Natural Language Input", icon: MessageCircle },
  { name: "Pay As You Go", icon: Wallet },
  { name: "Plug and Play", icon: PlugZap },
  { name: "HEC Sponsored", icon: BadgeCheck },
  { name: "Context Aware", icon: BrainCircuit },
  { name: "Multi Camera", icon: Video },
  { name: "Notifications", icon: Bell },
  { name: "Define Anomalies", icon: AlertTriangle },
  { name: "Low Latency", icon: Timer },
];

// const ScrollingImageList = ({ images }) => {
//   return (
//     <div className="flex flex-col items-center overflow-hidden">
//        {/* Left shadow overlay */}
//        <div className="absolute top-0 left-0 bottom-0 w-64 bg-gradient-to-r from-transparent to-transparent pointer-events-none z-10" />
        
//         {/* Right shadow overlay */}
//         <div className="absolute top-0 right-0 bottom-0 w-64 bg-gradient-to-l from-transparent to-transparent pointer-events-none z-10" />

//       <div className="scroll-container">
//         <div className="scrolling-images">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image.src}
//               alt={image.alt}
//               className="scrolling-image"
//             />
//           ))}
          
//           {images.map((image, index) => (
//             <img
//               key={`repeat-${index}`}
//               src={image.src}
//               alt={image.alt}
//               className="scrolling-image"
//             />
//           ))}
        
//         </div>
//       </div>
      
//     </div>
//   );
// };

