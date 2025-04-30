import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionComponent from '../SectionComponent';

const WhoFor = () => {
  return (
    <div>
      <SectionComponent 
        text="User" 
        heading="Who Is This For?" 
        subheading="Our solution is tailored for industries like education, security, manufacturing, and public safety where real-time anomaly detection is critical."
      >
        <VerticalSlidingCards /> 
      </SectionComponent>
    </div>
  );
};
const items = [
  {
    title: "Petrol Pump",
    description: "Enhance safety at fuel stations.",
    imageUrl: "/images/petrol_pump.jpeg"
  },
  {
    title: "Public Space",
    description: "Improve security in public areas.",
    imageUrl: "/images/public_space.jpeg"
  },
  {
    title: "Retail Stores",
    description: "Prevent theft and analyze behavior.",
    imageUrl: "/images/retail_stores.jpeg"
  },
  {
    title: "Schools",
    description: "Ensure student safety and attendance.",
    imageUrl: "/images/school.jpeg"
  },
  {
    title: "Malls",
    description: "Optimize visitor flow and security.",
    imageUrl: "/images/shopping_mall.jpeg"
  },
  {
    title: "Warehouses",
    description: "Monitor inventory and logistics.",
    imageUrl: "/images/warehouse.jpeg"
  },
  {
    title: "Offices",
    description: "Secure premises against threats.",
    imageUrl: "/images/office.jpeg"
  },
  {
    title: "Factory",
    description: "Ensure safety and optimize production.",
    imageUrl: "/images/factory.jpeg"
  },
  {
    title: "Fire Hazard",
    description: "Early fire risk detection.",
    imageUrl: "/images/fire_hazard.jpeg"
  },
  {
    title: "Airport",
    description: "Enhance security screening.",
    imageUrl: "/images/airport.jpeg"
  },
  {
    title: "Banks",
    description: "Strengthen security measures.",
    imageUrl: "/images/bank.jpeg"
  },
  {
    title: "Wildlife",
    description: "Protect wildlife in their habitats.",
    imageUrl: "/images/wildlife.jpeg"
  }
];



const VerticalSlidingCards = () => {
  const itemsPerColumn = Math.ceil(items.length / 3);
  const itemHeight = 160; // Reduced from 220px to 160px
  const columnHeight = itemsPerColumn * itemHeight;
  const totalHeight = columnHeight * 3;

  const [translateY1, setTranslateY1] = useState(columnHeight);
  const [translateY2, setTranslateY2] = useState(0);
  const [translateY3, setTranslateY3] = useState(columnHeight);
  
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const speed = 0.5;



    // my-2 = 8px
    const animate = () => {
      setTranslateY1(prev => {
        const newY = prev - speed;
        return newY <= itemHeight/4 + 8 ? columnHeight  : newY;
      });
      setTranslateY2(prev => {
        const newY = prev + speed;
        return newY >= columnHeight ? itemHeight/4 + 8: newY;
      });
      setTranslateY3(prev => {
        const newY = prev - speed;
        return newY <= itemHeight/4 + 8? columnHeight : newY;
      });
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [columnHeight]);

  const createColumn = (startIndex, endIndex) => {
    const columnItems = items.slice(startIndex, endIndex);
    const repeatedItems = [...columnItems, ...columnItems, ...columnItems];
    
    return repeatedItems.map((item, index) => (
      <motion.div 
        key={`${startIndex}-${index}`}
        className="w-full h-[140px] flex-shrink-0 relative overflow-hidden my-2 rounded-lg"
        style={{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1.3) contrast(0.9)', // Increase brightness by 30%
          border: '1px solid gray' // 1px gray border
        }}
      >
        {/* Inner shadow overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90" 
        />

        {/* Content container */}
        <div className="absolute inset-0 flex flex-col justify-end items-center p-2 text-white">
          <h3 className="text-m mb-1 text-center text-white">{item.title}</h3>
          <p className="text-xs text-center text-white">{item.description}</p>
        </div>
      </motion.div>

    ));
  };

  return (
    <div className="flex justify-center items-center bg-transparent p-4">
      <div
        className="relative w-[720px] h-[480px] overflow-hidden bg-transparent rounded-lg"
        style={{
          boxShadow: 'inset 0 10px 10px -10px rgba(255,255,255,1), inset 0 -10px 10px -10px rgba(255,255,255,1)'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        <div ref={containerRef} className="absolute top-0 left-0 right-0 flex">
          <div 
            className="w-1/3 px-2" 
            style={{ transform: `translateY(${-translateY1}px)` }}
          >
            {createColumn(0, itemsPerColumn)}
          </div>
          <div 
            className="w-1/3 px-2" 
            style={{ transform: `translateY(${-translateY2}px)` }}
          >
            {createColumn(itemsPerColumn, 2 * itemsPerColumn)}
          </div>
          <div 
            className="w-1/3 px-2" 
            style={{ transform: `translateY(${-translateY3}px)` }}
          >
            {createColumn(2 * itemsPerColumn, 3 * itemsPerColumn)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoFor;