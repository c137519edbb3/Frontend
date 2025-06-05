import React from 'react';
import SectionComponent from '../SectionComponent';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaAlignRight,
  FaAlignLeft,
  FaClipboard,
  FaFileAlt,
  FaPenFancy,
  FaTable,
} from 'react-icons/fa';

const a = "/images/a.jpg";
const b = "/images/b.jpg";
const c = "/images/c.jpg";
const d = "/images/d.jpg";
const e = "/images/e.jpg";
const f = "/images/f.jpg";
const g = "/images/g.jpg";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}>
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  backgroundImage,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={cn("relative row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-2 sm:p-4 dark:bg-white dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-2 sm:space-y-4 overflow-hidden h-auto sm:h-full",
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-200 group-hover/bento:scale-105"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 group-hover/bento:bg-black/30 transition-colors duration-200"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {header}
      </div>
      <motion.div 
        whileHover={{ x: 8 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 group-hover/bento:translate-x-2 transition duration-200"
      >
        <div className="text-white mb-1 sm:mb-2">{icon}</div>
        <div className="font-sans font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">
          {title}
        </div>
        <div className="font-sans font-normal text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed">
          {description}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ChooseUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <SectionComponent 
        text="Product" 
        heading="Why Choose Us?" 
        subheading="Transform security management with context-aware AI, providing real-time anomaly detection and tailored insights to enhance safety and efficiency across industries."
      >
        <BentoGridWidget />
      </SectionComponent>
    </motion.div>
  );
};

export default ChooseUs;

function BentoGridWidget() {
  console.log("Image paths:", { a, b, c, d, e, f, g });
  return (
    <BentoGrid className="relative w-full h-full overflow-hidden bg-transparent rounded-lg">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          index={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          backgroundImage={item.backgroundImage} 
          className={cn(
            // Mobile: all items span 1 column
            "col-span-1",
            // Small screens: some items span 2 columns
            "sm:col-span-1",
            // Large screens: specific items span 2 columns
            (i === 3 || i === 6) ? "lg:col-span-2" : "lg:col-span-1"
          )}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[4rem] sm:min-h-[6rem] rounded-xl bg-transparent from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: 'Real-Time Reporting',
    description: 'Support for multiple alert channels such as SMS, email, push notifications.',
    header: <Skeleton />,
    icon: <FaClipboard className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: a,
  },
  {
    title: 'Context-Aware Detection',
    description: "Detect anomalies with an understanding of environmental context.",
    header: <Skeleton />,
    icon: <FaFileAlt className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: b,
  },
  {
    title: 'Cloud and Edge Processing',
    description: 'Process data on cloud or edge for low latency and cost efficiency.',
    header: <Skeleton />,
    icon: <FaPenFancy className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: c,
  },
  {
    title: 'Advanced Visual Analytics',
    description: 'Solutions tailored for diverse industries like safety, public spaces, and retail stores.',
    header: <Skeleton />,
    icon: <FaTable className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: d,
  },
  {
    title: 'AI Training on Custom Datasets',
    description: 'Enable customers to train models on their proprietary datasets.',
    header: <Skeleton />,
    icon: <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: e,
  },
  {
    title: '24/7 Support',
    description: 'Ensure round-the-clock customer service and monitoring.',
    header: <Skeleton />,
    icon: <FaAlignLeft className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: f,
  },
  {
    title: 'Low-Latency Detection',
    description: 'Report anomalies almost instantly.',
    header: <Skeleton />,
    icon: <FaAlignRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500" />,
    backgroundImage: g,
  },
];