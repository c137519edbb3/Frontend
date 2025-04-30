import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionComponent from '../SectionComponent';


const Team = () => {
  return (
    <div>
      <SectionComponent 
        text="Team" 
        heading="Meet the incredible team" 
        subheading="We pride ourselves of being the best of the best and our team encapsulates that."
      >
        <HorizontalSlidingCards />
      </SectionComponent>
    </div>
  );
};


export default Team;
const items = [
  { 
    title: "Dr. Jawwad Shamsi", 
    description: "faculty", 
    imageUrl: "/images/JawwadShamsi.png"
  },
  { 
    title: "Dr. Burhan Khan", 
    description: "faculty", 
    imageUrl: "/images/BurhanKhan.jpg"
  },
  // { 
  //   title: "Dr. Narmeen Bawany", 
  //   description: "faculty", 
  //   imageUrl: women
  // },
  // { 
  //   title: "Alina Arshad", 
  //   description: "Developer", 
  //   imageUrl: women
  // },
  // { 
  //   title: "Filza Akhlaq", 
  //   description: "Developer", 
  //   imageUrl: women
  // },
  // { 
  //   title: "Syeda Ravia Ejaz", 
  //   description: "Developer", 
  //   imageUrl: women
  // },
  // { 
  //   title: "Ayesha Zia", 
  //   description: "Developer", 
  //   imageUrl: women
  // },
  { 
    title: "Aiman Imran", 
    description: "Developer", 
    imageUrl: "/images/aiman.jpeg"
  },
  { 
    title: "Muhammad Yahya", 
    description: "Developer", 
    imageUrl: "/images/yahya.jpg"
  },
  { 
    title: "Yousuf Ahmed", 
    description: "Developer", 
    imageUrl: "/images/yousuf.png"
  },
  { 
    title: "Sufiyaan Usmani", 
    description: "Developer", 
    imageUrl: "/images/sufiyan.png"
  },
  { 
    title: "Umer Tariq", 
    description: "Developer", 
    imageUrl: "/images/Umer.png"
  }
];


const HorizontalSlidingCards = () => {
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = items.length * 200;

    const animate = () => {
      setTranslateX(prev => {
        const newX = prev - 0.5;
        if (newX <= -totalWidth) {
          return 0;
        }
        return newX;
      });
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="flex justify-center items-center bg-transparent p-4">
      <div
        className="relative w-[800px] h-[200px] overflow-hidden bg-transparent rounded-lg"
        style={{
          // boxShadow: 'inset 10px 0 10px -10px rgba(255,255,255,1), inset -10px 0 10px -10px rgba(255,255,255,1)'
        }}
      >
        {/* Left shadow overlay */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        
        {/* Right shadow overlay */}
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        <div 
          ref={containerRef}
          className="absolute top-0 left-0 bottom-0 flex" 
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {[...items, ...items].map((item, index) => (
            <motion.div 
              key={index} 
              className="w-[200px] h-full flex-shrink-0 flex flex-col items-center justify-center  border  mx-1 p-2 rounded-lg"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                filter: 'brightness(1.3) contrast(1)', // Increase brightness by 30%
                border: '1px solid gray' // 1px gray border
              }}
            >
              {/* Inner shadow overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90 rounded-lg" 
                
              />

              {/* Content container */}
              <div className="absolute inset-0 flex flex-col justify-end items-center p-2">
                <h3 className="text-m  text-center text-gray-200">{item.title}</h3>
                <p className="text-xs text-center text-gray-200">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
